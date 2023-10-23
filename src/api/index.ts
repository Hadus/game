import request from './request';

// 获取数据
export const fetchAllData = (data: object = {}) => {
  return request({
    url: 'allData',
    method: 'post',
    data
  });
};
// 数据同步
export const fetchSync = () => {
  return request({
    url: 'sync',
    method: 'get',
  });
};
// 是否关注比赛
export const fetchFocusMatch = (data = {}) => {
  return request({
    url: 'focusMatch',
    method: 'post',
    data
  });
};