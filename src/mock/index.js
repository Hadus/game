import allDataJson from './data.json';
export default [{
  url: '/getData',
  type: 'post',
  response: (request) => {
    allDataJson.minConsecutiveNumber = request.query.minConsecutiveNumber;
    return allDataJson
  }
}, {
  url: '/sync',
  type: 'get',
  response: (res) => {
    return {
      time: '2023-01-01 01:01:01',
      flag: true
    }
  }
},{
  url: '/removeFocus',
  type: 'post',
  response: (res) => {
    return {
      unfocusTeam: res.query.unfocusTeam,
    }
  }
},{
  url: '/getSeasonSummary',
  type: 'post',
  response: ({body}) => {
    return {
      demo: 1
    }
  }
}]