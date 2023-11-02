<template>
  <div class="main-content scroll">
    <h3>{{ matchData.curSeason }}赛季 盘路分析
      <span>（需关注的比赛：24小时内将开始
        <span>{{ focusMatchNum_24 }}</span>
        场， 1小时内将开始
        <span class="alert-color">{{ focusMatchNum_1 }} </span> 场）
      </span>
    </h3>
    <!-- 设置 -->
    <div class="set">
      <div>
        连赢连输场次基数切换：
        <el-select v-model="num" class="select-num">
          <el-option v-for="item in numOptions" :key="item" :label="item" :value="item" :disabled="item == num">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-button type="primary" @click="handelSwitchNum(num)">切换</el-button>
      </div>
      <div>
        上次同步：
        <el-tag>{{ matchData.lastUpdateTime }}</el-tag>
      </div>
      <el-button type="primary" @click="handelSync()" v-if="!syncingFlag">数据同步</el-button>
      <el-button type="primary" loading disabled v-else>正在同步</el-button>
    </div>
    <!-- 筛选 -->
    <div class="filter">
      <div class="stat-today">
        <MatchStatToday :winTeam="winTeam" :loseTeam="loseTeam" />
      </div>
      <div>
        预警提醒：
        <el-switch v-model="alertFlag" style="--el-switch-on-color: #13ce66;" @click="handleSwitchAlert()" />
      </div>
      <el-affix>
        联赛类型选择：
        <el-select v-model="league" clearable class="select-type" @change="handleChangeLeagueName(league)"
          value-key="index">
          <el-option v-for="item in leagueOptions" :key="item.index" :label="item.leagueName" :value="item">
          </el-option>
        </el-select>
      </el-affix>
    </div>
    <!-- 统计 -->
    <div class="stat">
      <MatchStat :curSeason="matchData.curSeason" :homeSeasonSummaryW="matchData.homeSeasonSummaryW"
        :homeSeasonSummaryL="matchData.homeSeasonSummaryL" :supportedSeason="matchData.supportedSeason" />
    </div>
    <!-- 表格 -->
    <div class="table">
      <match-block :minConsecutiveNumber="matchData.minConsecutiveNumber" :teamsData="teams"
        v-for="(teams, index) in  matchData.data" :key="index" />
    </div>
  </div>
</template>

<script setup lang="ts" name="home">
import { onMounted, ref, reactive, provide, computed } from 'vue';
import { ElLoading, ElNotification } from 'element-plus';
import MatchStatToday from './MatchStatToday.vue';
import MatchStat from './MatchStat';
import MatchBlock from './MatchBlock';
import { fetchGetData, fetchSync, fetchGetSyncStatus } from '@/api';

let matchData = ref({});
let leagueOptions = ref([]);
// 调用：获取所有数据
const handelFetchAllData = (num: string = '4', isSync = false) => {
  fetchGetData({ minConsecutiveNumber: num }).then((res) => {
    console.log(res)
    matchData.value = res.data;
    const matchDataList = matchData.value.data;
    const leagueOptions_temp = computed(() => {
      return matchDataList.map((ele, index) => {
        return {
          leagueName: ele.leagueName,
          index
        };
      });
    });
    leagueOptions.value = leagueOptions_temp.value;
    if (isSync) {
      ElNotification({
        title: '数据同步完成',
        message: '',
        type: 'success',
      });
    }
  }).catch((error) => {
    console.log(error);
    if (isSync) {
      syncFail()
    }
  });
}
handelFetchAllData();

/* 设置 start */
// 切换场次
const num = ref('4');
const numOptions = ['4', '5', '6', '7', '8', '9'];
const handelSwitchNum = (num: string = '4') => {
  handelFetchAllData(num);
};

// 数据同步
let syncingFlag = ref(false)
const syncFail = () => {
  ElNotification({
    title: '数据同步失败',
    message: '',
    type: 'error',
  });
  syncingFlag.value = true
}

async function handelSync() {
  syncingFlag.value = true
  const time = 15
  let timer;

  // 1. 点击按钮调用获取同步状态接口，查看请求状态
  const res_firstFetchGetSyncStatus = await fetchGetSyncStatus()
  try {
    if (res_firstFetchGetSyncStatus.status != 200) {
      throw {}
    }
    // 0 同步成功
    // 1 正在同步
    // -1 同步失败
    // 2 正在同步(之前点击过同步)
    const firstStatus = res_firstFetchGetSyncStatus.data.status
    if (firstStatus == 1 || firstStatus == 2) {
      // 2. 点击按钮调用同步接口，请求后台同步数据
      fetchSync()
      timer = setInterval(() => {
        // 3. 每过 time 调用获取同步状态接口，查看请求状态
        fetchGetSyncStatus().then((res) => {
          console.log(res)
          const { status } = res.data
          switch (status) {
            case -1:
              syncFail()
              timer = null
              break;
            case 0:
              handelFetchAllData()
              syncingFlag.value = false
              timer = null
              break;
            case 1:
              ElNotification({
                title: '数据同步中',
                message: '',
                type: 'warning',
              });
              syncingFlag.value = true
              break;
            default:
              syncFail()
              timer = null
              break;
          }
        }).catch((error) => {
          console.log(error)
          syncFail()
          timer = null
        })
      }, time * 1000)
    }
  } catch (err) {
    console.log(err)
    syncFail()
    timer = null
  }

  // 2. 每过 time 调用获取同步状态接口，查看请求状态
  // const timer = setInterval(() => {
  // 0 同步成功
  // 1 正在同步
  // -1 同步失败
  // 2 正在同步(之前点击过同步)

  // switch (resSyncStatus) {
  //   case -1:
  //     syncingFlag.value = true
  //     break;
  //   case 0:
  //     syncingFlag.value = false
  //     break;
  //   case 1:
  //     syncingFlag.value = true
  //     break;
  //   default:
  //     syncingFlag.value = true
  //     break;
  // }
  // }, time * 1000)

  // 调用：数据同步
  // if (res_sync.data.flag) {
  //   // 重新获取数据
  //   handelFetchAllData();
  //   ElNotification({
  //     title: '数据同步完成',
  //     message: '时间：' + res_sync.data.time,
  //     type: 'success',
  //   });
  // } else {
  //   ElNotification({
  //     title: '数据同步失败',
  //     message: '',
  //     type: 'error',
  //   });
  // }

}

async function handelSyncStatus() {
  try {
    // 调用：数据同步
    const res_syncStatus = await fetchGetSyncStatus();
    if (res_syncStatus.data.flag) {


    } else {
      throw {

      }
    }
  } catch (err) {
    console.log(err)
  }
}
/* 设置 end */

/* 筛选 start */
let alertFlag = ref(false)
const handleSwitchAlert = function () {
  !!focusMatchNum_1.value && (!!alertFlag.value ? audioPlay() : audioClose());
}
// 切换联赛
let league = ref({});

const handleChangeLeagueName = (league: object) => {
  const dom_topList = document.querySelectorAll('.top');

  if (!league.index) {
    const dom_scroll = document.querySelector('.scroll');
    dom_scroll.scrollTo(0, 0);
    return;
  }
  const dom_league = dom_topList[league.index];
  dom_league.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}
/* 筛选 end */

// 需要关注的比赛场次
let focusMatchNum_24 = ref<number>(0);
let focusMatchNum_1 = ref<number>(0);

// audio
const audio = new Audio('/audio/preview.mp3');
const audioPlay = () => {
  audio.play();
}
const audioClose = () => {
  audio.pause();
}

// provide 给 MatchStatus 调用
// 计算连赢和连输队伍数量
let winTeam = ref<number>(0);
let loseTeam = ref<number>(0);
const handelStatMatchTeam = (isWin: boolean) => {
  isWin ? winTeam.value++ : loseTeam.value++;
}
// 计算需要关注的比赛场次
const handelStatFocusMatch = (startHour: number,) => {
  focusMatchNum_24.value++;
  if (startHour === 1) {
    focusMatchNum_1.value++;
  }
}

provide('handelStatMatchTeam', handelStatMatchTeam);
provide('handelStatFocusMatch', handelStatFocusMatch);
</script>
<style lang="less" scoped>
// 变量
@botPadding: 20px;

.main-content {
  width: 100%;
  height: 100%;
  padding: @botPadding;
  padding-top: 0;

  >h3 {
    text-align: center;
    line-height: 50px;
    background-color: @mainBgc;
    color: #fff;
    font-size: 18px;
    font-weight: bold;

    >span {
      font-weight: normal;
      font-size: 14px;
    }
  }

  >.set {
    height: 80px;
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: right;
    border-bottom: @border;

    >div {
      height: 100%;
      display: inline-block;
      margin-right: 20px;
    }
  }

  >.filter {
    height: 80px;
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: right;
    position: relative;

    >div {
      height: 100%;
      display: inline-block;
      margin-right: 20px;
    }

    >.stat-today {
      position: absolute;
      left: 20px;
      top: 10px;
    }

    /deep/.el-affix--fixed {
      height: 50px !important;
      padding: 10px 0 !important;
      background-color: #d1edc4;
      width: 500px !important;
      text-align: center;
      font-size: 16px !important;
      border-radius: 20px;
      margin: 0 auto;
      left: calc(50% - 250px);
    }
  }

  >.table {
    width: 100%;
  }

  /deep/.select-num .el-input {
    width: 80px !important;
  }

  /deep/.select-league .el-input {
    width: 120px !important;
  }
}

.alert-color {
  animation: alertColor 1.2s ease-in-out infinite;
  font-weight: 500;
  font-size: 15px;
}

@keyframes alertColor {
  0% {
    color: #fff;
  }

  100% {
    color: #f40;
  }
}
</style>
<style lang="less"></style>