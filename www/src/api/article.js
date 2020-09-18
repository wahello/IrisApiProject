import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/admin/article',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: `/admin/article/${id}`,
    method: 'get'
  })
}

export function createArticle(data) {
  return request({
    url: '/admin/article',
    method: 'post',
    data
  })
}

export function updateArticle(data, id) {
  return request({
    url: `/admin/article/${id}`,
    method: 'post',
    data
  })
}

export function deleteArticle(id) {
  return request({
    url: `/admin/article/${id}`,
    method: 'delete'
  })
}
