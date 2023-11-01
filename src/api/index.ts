import request from './request';

// 测试接口
export const fetchTest = () => {
  return request({
    url: 'get',
    method: 'get'
  });
};
// 获取数据
export const fetchGetData = (data: object = {}) => {
  return request({
    url: 'getData',
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
export const fetchRemoveFocus = (data = {}) => {
  return request({
    url: 'removeFocus',
    method: 'post',
    data
  });
};
// 查看统计详情
export const fetchDetail = (data = {}) => {
  return request({
    url: 'getSummary',
    method: 'post',
    data
  });
};