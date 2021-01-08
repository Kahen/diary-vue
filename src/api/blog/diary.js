import request from '@/utils/request'

export function get(data) {
  return request({
    url: 'api/diary',
    method: 'get',
    data
  })
}

export function add(data) {
  return request({
    url: 'api/diary',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/diary/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/diary',
    method: 'put',
    data
  })
}

export default { get, add, edit, del }
