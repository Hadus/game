import allDataJson from './allData.json';
export default [{
  type: 'post',
  url: '/api/allData',
  response: ({body}) => {
    return allDataJson
  }
}, {
  type: 'get',
  url: '/api/sync',
  response: ({body}) => {
    return {
      time: '2023-10-10 10:10:10',
      allDataJson
    }
  }
},{
  type: 'post',
  url: '/api/focusMatch',
  response: ({body}) => {
    return {
      time: '2023-10-10 10:10:10',
      allDataJson
    }
  }
}]