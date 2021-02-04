import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/collect',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/collect/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/collect',
    method: 'put',
    data
  })
}

export function createOrUpdate(blogId, data) {
  return request({
    url: 'api/collect/' + blogId,
    method: 'get',
    params: {
      collectId: data
    }
  })
}

export default { add, edit, del, createOrUpdate }
