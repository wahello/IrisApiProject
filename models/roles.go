package models

import (
	"fmt"
	"strconv"

	"github.com/jinzhu/gorm"
)

type Role struct {
	gorm.Model

	Name        string `gorm:"unique;not null VARCHAR(191)"`
	DisplayName string `gorm:"VARCHAR(191)"`
	Description string `gorm:"VARCHAR(191)"`
}

type RoleRequest struct {
	Name        string `json:"name"`
	DisplayName string `json:"display_name"`
	Description string `json:"description"`
}

type RoleFormRequest struct {
	Name           string `json:"name" validate:"required,gte=4,lte=50"`
	DisplayName    string `json:"display_name"`
	Description    string `json:"description"`
	PermissionsIds []uint `json:"permissions_ids"`
}

/**
 * 通过 id 获取 role 记录
 * @method GetRoleById
 * @param  {[type]}       role  *Role [description]
 */
func GetRoleById(id uint) *Role {
	role := new(Role)
	Db.Where("id = ?", id).First(role)
	return role
}

/**
 * 通过 name 获取 role 记录
 * @method GetRoleByName
 * @param  {[type]}       role  *Role [description]
 */
func GetRoleByName(name string) *Role {
	role := new(Role)
	Db.Where("name = ?", name).First(role)
	return role
}

/**
 * 通过 id 删除角色
 * @method DeleteRoleById
 */
func DeleteRoleById(id uint) {
	u := new(Role)
	u.ID = id
	if err := Db.Delete(u).Error; err != nil {
		fmt.Printf("DeleteRoleErr:%s \n", err)
	}
}

/**
 * 获取所有的角色
 * @method GetAllRole
 * @param  {[type]} name string [description]
 * @param  {[type]} orderBy string [description]
 * @param  {[type]} offset int    [description]
 * @param  {[type]} limit int    [description]
 */
func GetAllRoles(name, orderBy string, offset, limit int) (roles []*Role) {

	if err := GetAll(name, orderBy, offset, limit).Find(&roles).Error; err != nil {
		fmt.Printf("GetAllRoleErr:%s \n", err)
	}
	return
}

/**
 * 创建
 * @method CreateRole
 * @param  {[type]} kw string [description]
 * @param  {[type]} cp int    [description]
 * @param  {[type]} mp int    [description]
 */
func CreateRole(aul *RoleRequest, permIds []uint) (role *Role) {

	role = new(Role)
	role.Name = aul.Name
	role.DisplayName = aul.DisplayName
	role.Description = aul.Description

	if err := Db.Create(role).Error; err != nil {
		fmt.Printf("CreateRoleErr:%s \n", err)
	}

	addPerms(permIds, role)

	return
}

func addPerms(permIds []uint, role *Role) {
	if len(permIds) > 0 {
		roleId := strconv.FormatUint(uint64(role.ID), 10)
		if _, err := Enforcer.DeletePermissionsForUser(roleId); err != nil {
			fmt.Printf("AppendPermsErr:%s \n", err)
		}
		var perms []Permission
		Db.Where("id in (?)", permIds).Find(&perms)
		for _, perm := range perms {
			if _, err := Enforcer.AddPolicy(roleId, perm.Name, perm.Act); err != nil {
				fmt.Printf("AddPolicy:%s \n", err)
			}
		}
	}
}

/**
 * 更新
 * @method UpdateRole
 * @param  {[type]} kw string [description]
 * @param  {[type]} cp int    [description]
 * @param  {[type]} mp int    [description]
 */
func UpdateRole(rj *RoleRequest, id uint, permIds []uint) (role *Role) {
	role = new(Role)
	role.ID = id

	if err := Db.Model(&role).Updates(rj).Error; err != nil {
		fmt.Printf("UpdatRoleErr:%s \n", err)
	}

	addPerms(permIds, role)

	return
}

// 角色权限
func RolePermisions(id uint) []*Permission {
	perms := Enforcer.GetPermissionsForUser(strconv.FormatUint(uint64(id), 10))
	var ps []*Permission
	for _, perm := range perms {
		if len(perm) >= 3 && len(perm[1]) > 0 && len(perm[2]) > 0 {
			p := GetPermissionByNameAct(perm[1], perm[2])
			if p.ID > 0 {
				ps = append(ps, p)
			}
		}
	}
	return ps
}

/**
*创建系统管理员
*@return   *models.AdminRoleTranform api格式化后的数据格式
 */
func CreateSystemAdminRole(permIds []uint) *Role {
	aul := new(RoleRequest)
	aul.Name = "admin"
	aul.DisplayName = "超级管理员"
	aul.Description = "超级管理员"

	role := GetRoleByName(aul.Name)
	if role.ID == 0 {
		return CreateRole(aul, permIds)
	} else {
		return role
	}
}
