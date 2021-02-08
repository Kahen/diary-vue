import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/comment',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/comment/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/comment',
    method: 'put',
    data
  })
}

export function findByBlog(blogId, page, size) {
  return request({
    url: 'api/comment/' + blogId,
    method: 'get',
    params: {
      page: page,
      size: size,
      sort: 'publishTime,desc'
    }
  })
}

export function addBlogComment(blogId, item) {
  return request({
    url: 'api/comment/' + blogId,
    method: 'post',
    data: item
  })
}

export default { add, edit, del, findByBlog, addBlogComment }
