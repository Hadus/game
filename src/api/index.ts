import request from './request';

// 获取数据
export const fetchAllData = (params: object = {}) => {
  return request({
    url: 'api/allData',
    method: 'post',
    params
  });
};
// 数据同步
export const fetchSync = () => {
  return request({
    url: 'api/sync',
    method: 'get',
  });
};
// 是否关注比赛
export const fetchFocusMatch = (params = {}) => {
  return request({
    url: 'api/focusMatch',
    method: 'post',
    params
  });
};