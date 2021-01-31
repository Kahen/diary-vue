import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/blog',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/blog/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/blog',
    method: 'put',
    data
  })
}

export function homeLine(data) {
  return request({
    url: 'api/blog/homeLine',
    method: 'get',
    params: {
      page: 0,
      size: 10
    }
  })
}

export default { homeLine, add, edit, del }
