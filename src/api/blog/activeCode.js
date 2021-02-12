import request from '@/utils/request'

export function getActiveCode(data) {
  return request({
    url: 'auth/activeCode',
    method: 'post',
    data: data
  })
}

export function reSendActiveCode(data) {
  return request({
    url: 'auth/reSendActiveCode',
    method: 'get',
    params: {
      email: data
    }
  })
}

export function enable(email, activeCode) {
  return request({
    url: 'auth/enable',
    method: 'get',
    params: {
      email: email,
      activeCode: activeCode
    }
  })
}

export default { getActiveCode, reSendActiveCode, enable }
