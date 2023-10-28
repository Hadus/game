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
      <el-button type="primary" @click="handelSync()">数据同步</el-button>
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
        :homeSeasonSummaryL="matchData.homeSeasonSummaryL" />
    </div>
    <!-- 表格 -->
    <div class="table">
      <match-block :minConsecutiveNumber="matchData.minConsecutiveNumber" :teamsData="teams"
        v-for="(teams, index) in  matchData.data " :key="index" />
    </div>
  </div>
</template>

<script setup lang="ts" name="home">
import { onMounted, ref, reactive, provide, computed } from 'vue';
import { ElLoading, ElNotification } from 'element-plus';
import MatchStatToday from './MatchStatToday.vue';
import MatchStat from './MatchStat';
import MatchBlock from './MatchBlock';
import { fetchGetData, fetchSync } from '@/api';

let matchData = ref({});
let leagueOptions = ref([]);
// 调用：获取所有数据
const handelFetchAllData = (num: string = '4') => {
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
  }).catch((error) => {
    console.log(error);
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
async function handelSync() {
  const loading = ElLoading.service({
    lock: true,
    text: '数据同步中，请稍后...',
    background: 'rgba(0, 0, 0, 0.7)',
    customClass: 'loading'
  });

  try {
    // 调用：数据同步
    const res_sync = await fetchSync();
    if (res_sync.data.flag) {
      // 重新获取数据
      handelFetchAllData();
      loading.close();
      ElNotification({
        title: '数据同步完成',
        message: '时间：' + res_sync.data.time,
        type: 'success',
      });
    } else {
      throw {

      }
    }
  } catch (err) {
    console.log(err)
    loading.close();
    ElNotification({
      title: '数据同步失败',
      message: '',
      type: 'error',
    });
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
// 计算连赢和连败队伍数量
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