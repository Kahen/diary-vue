import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/like',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/like/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/like',
    method: 'put',
    data
  })
}

export function createOrUpdate(blogId, data) {
  return request({
    url: 'api/like/' + blogId,
    method: 'get',
    params: {
      likeId: data
    }
  })
}

export default { add, edit, del, createOrUpdate }
