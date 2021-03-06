import request from '@/utils/request'

export function get(data) {
  return request({
    url: 'api/diary',
    method: 'get',
    data
  })
}

export function getAllByUser(page, count) {
  return request({
    url: 'api/diary/timeline',
    method: 'get',
    params: {
      page: page,
      size: count
    }
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

export function findOne(time) {
  return request({
    url: 'api/diary/' + time,
    method: 'get'
  })
}

export default { findOne, get, add, edit, del, getAllByUser }
