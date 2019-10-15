import apiUtils from './apiUtils'

export const getOrderList = params => {
    return apiUtils.commonGet('/dd/order/list/get', params)
}
export const getOrderDetail = params => {
    return apiUtils.commonGet('/dd/order/detail/get', params)
}
export const submitOrder = params => {
    return apiUtils.commonPost('/ding/order/submit', params)
}

export const userInfo = params => {
    return apiUtils.commonGet('/ding/user/info/get', params)
}