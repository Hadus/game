import request from './request';

export const fetchData = (data: object = {}) => {
  return request({
    url: 'data',
    method: 'post',
    data
  });
};