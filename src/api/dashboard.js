import request from '@/utils/request'

export function findAll() {
  return request({
    url: 'api/motto',
    method: 'get'
  })
}
