(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-66a06435"],{"0f69":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-container"},[r("el-button",{attrs:{type:"primary"},on:{click:e.handleAddUser}},[e._v("添加用户")]),r("el-table",{staticStyle:{width:"100%","margin-top":"30px"},attrs:{data:e.usersList,border:""}},[r("el-table-column",{attrs:{align:"center",label:"ID",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.id)+" ")]}}])}),r("el-table-column",{attrs:{align:"center",label:"用户标识",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.name)+" ")]}}])}),r("el-table-column",{attrs:{align:"center",label:"用户名称",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.username)+" ")]}}])}),r("el-table-column",{attrs:{align:"header-center",label:"描述"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.introduction)+" ")]}}])}),r("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(r){return e.handleEdit(t)}}},[e._v("编辑")]),r("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(r){return e.handleDelete(t)}}},[e._v("删除")])]}}])})],1),r("el-dialog",{attrs:{visible:e.dialogVisible,title:"edit"===e.dialogType?"编辑用户":"添加用户"},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("el-form",{attrs:{model:e.user,"label-width":"80px","label-position":"left"}},[r("el-form-item",{attrs:{label:"标识"}},[r("el-input",{attrs:{placeholder:"用户标识"},model:{value:e.user.name,callback:function(t){e.$set(e.user,"name",t)},expression:"user.name"}})],1),r("el-form-item",{attrs:{label:"名称"}},[r("el-input",{attrs:{placeholder:"用户名称"},model:{value:e.user.username,callback:function(t){e.$set(e.user,"username",t)},expression:"user.username"}})],1),r("el-form-item",{attrs:{label:"描述"}},[r("el-input",{attrs:{autosize:{minRows:2,maxRows:4},type:"textarea",placeholder:"用户描述"},model:{value:e.user.introduction,callback:function(t){e.$set(e.user,"introduction",t)},expression:"user.introduction"}})],1),r("el-form-item",{attrs:{label:"权限"}},[r("el-tree",{ref:"tree",staticClass:"permission-tree",attrs:{"check-strictly":e.checkStrictly,data:e.routesData,props:e.defaultProps,"show-checkbox":"","node-key":"id"}})],1)],1),r("div",{staticStyle:{"text-align":"right"}},[r("el-button",{attrs:{type:"danger"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("取消")]),r("el-button",{attrs:{type:"primary"},on:{click:e.confirmUser}},[e._v("确认")])],1)],1)],1)},s=[],a=(r("99af"),r("4160"),r("caad"),r("a434"),r("b0c0"),r("2532"),r("159b"),r("b85c")),i=(r("96cf"),r("1da1")),c=r("ed08"),o=r("b775");function u(){return Object(o["a"])({url:"/admin/roles",method:"get"})}function l(){return Object(o["a"])({url:"/admin/users",method:"get"})}function d(e){return Object(o["a"])({url:"/admin/users",method:"post",data:e})}function f(e,t){return Object(o["a"])({url:"/admin/users/".concat(e),method:"put",data:t})}function h(e){return Object(o["a"])({url:"/admin/users/".concat(e),method:"delete"})}var m={id:0,name:"",username:"",introduction:"",roles:[],role_ids:[]},p={data:function(){return{user:Object.assign({},m),roles:[],usersList:[],dialogVisible:!1,dialogType:"new",checkStrictly:!1,defaultProps:{children:"children",label:"title"}}},computed:{routesData:function(){return this.roles}},created:function(){this.getRoles(),this.getUsers()},methods:{getRoles:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,u();case 2:r=t.sent,e.serviceRoles=r.data,e.roles=e.generateRoles(r.data);case 5:case"end":return t.stop()}}),t)})))()},getUsers:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,l();case 2:r=t.sent,e.usersList=r.data;case 4:case"end":return t.stop()}}),t)})))()},generateRoles:function(e){var t=[];if(null==e||0===e.length)return t;var r,n=Object(a["a"])(e);try{for(n.s();!(r=n.n()).done;){var s=r.value;if(!s.hidden){var i={id:s.id,title:s.name};t.push(i)}}}catch(c){n.e(c)}finally{n.f()}return t},generateArr:function(e){var t=[];return e.forEach((function(e){t.push(e)})),t},handleAddUser:function(){this.user=Object.assign({},m),this.$refs.tree&&this.$refs.tree.setCheckedNodes([]),this.dialogType="new",this.dialogVisible=!0},handleEdit:function(e){var t=this;this.dialogType="edit",this.dialogVisible=!0,this.checkStrictly=!0,this.user=Object(c["c"])(e.row),this.$nextTick((function(){var e=t.generateRoles(t.user.roles);t.$refs.tree.setCheckedNodes(t.generateArr(e)),t.checkStrictly=!1}))},handleDelete:function(e){var t=this,r=e.$index,n=e.row;this.$confirm("确认移除这个用户吗?","Warning",{confirmButtonText:"确认",cancelButtonText:"取消",type:"warning"}).then(Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,h(n.id);case 2:t.usersList.splice(r,1),t.$message({type:"success",message:"删除成功!"});case 4:case"end":return e.stop()}}),e)})))).catch((function(e){console.error(e)}))},generateTree:function(e,t){var r,n=[],s=Object(a["a"])(e);try{for(s.s();!(r=s.n()).done;){var i=r.value;t.includes(i.id)&&n.push(i.id)}}catch(c){s.e(c)}finally{s.f()}return n},confirmUser:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,n,s,a,i,o,u,l,h,m,p,b,g;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(r="edit"===e.dialogType,n=e.$refs.tree.getCheckedKeys(),e.user.role_ids=e.generateTree(Object(c["c"])(e.serviceRoles),n),!r){t.next=21;break}return t.next=6,f(e.user.id,e.user);case 6:if(s=t.sent,a=s.code,i=s.data,200!==a){t.next=19;break}e.user=i,o=0;case 12:if(!(o<e.usersList.length)){t.next=19;break}if(e.usersList[o].id!==e.user.id){t.next=16;break}return e.usersList.splice(o,1,Object.assign({},e.user)),t.abrupt("break",19);case 16:o++,t.next=12;break;case 19:t.next=27;break;case 21:return t.next=23,d(e.user);case 23:u=t.sent,l=u.code,h=u.data,200===l&&(e.user=h.data,e.usersList.push(e.user));case 27:m=e.user,p=m.introduction,b=m.username,g=m.name,e.dialogVisible=!1,e.$notify({title:"Success",dangerouslyUseHTMLString:!0,message:"\n            <div>用户标识: ".concat(g,"</div>\n            <div>用户名称: ").concat(b,"</div>\n            <div>描述: ").concat(p,"</div>\n          "),type:"success"});case 30:case"end":return t.stop()}}),t)})))()}}},b=p,g=(r("50fb"),r("2877")),v=Object(g["a"])(b,n,s,!1,null,"25d36396",null);t["default"]=v.exports},3296:function(e,t,r){},"50fb":function(e,t,r){"use strict";var n=r("3296"),s=r.n(n);s.a}}]);