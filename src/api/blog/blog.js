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

export function homeLine(page, count) {
  return request({
    url: 'api/blog/homeLine',
    method: 'get',
    params: {
      page: page,
      size: count,
      sort: 'publishTime,desc'
    }
  })
}

export default { homeLine, add, edit, del }
