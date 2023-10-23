<template>
  <div class="main-content scroll">
    <h3>2023赛季 球队连赢连输分析
      <span>（需关注的比赛：24小时内开始 {{ focusMatchNum_24 }} 场， 1小时内开始 {{ focusMatchNum_1 }} 场）</span>
    </h3>
    <div class="set">
      连赢连输场次基数选择：
      <el-select v-model="num" class="select-num">
        <el-option v-for="item in numOptions" :key="item" :label="item" :value="item" :disabled="item == num">
        </el-option>
      </el-select>
      上次同步：{{ MatchData.lastReloadTime }}
      <el-button type="primary" @click="handelSet({ type })">数据同步</el-button>
    </div>
    <div class="filter">
      <div>
        联赛类型选择：
        <el-select v-model="type" clearable class="select-type">
          <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item" :disabled="item == type">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-button type="primary" @click="handelFilter({ type })">筛选</el-button>
      </div>
    </div>
    <div class="table">
      <match-block :teamsData="teams" v-for="(teams, index) in MatchData" :key="index"></match-block>
    </div>
  </div>
</template>

<script setup lang="ts" name="home">
import { onMounted, ref, reactive, provide, computed } from 'vue'
import { ElLoading } from 'element-plus';

import MatchBlock from './MatchBlock';
import MatchData from '@/mock/data.json';
import { fetchData } from '../../api';

/* 设置 start */
const num = ref('4');
const numOptions = ['4', '5'];
const handelSet = (num) => {
  const loading = ElLoading.service({
    lock: true,
    text: '数据同步中，请稍后...',
    background: 'rgba(0, 0, 0, 0.7)',
    customClass: 'loading'
  })
  setTimeout(() => {
    loading.close();
  }, 17000)
}
/* 设置 end */
/* 筛选 start */
const type = ref('');
let typeOptions = ref([]);
const handelFilter = (filterObj: object = { type: '' }) => {
  console.log(filterObj);
  fetchData({
    type: filterObj,
  });
};
/* 筛选 end */
// 需要关注的比赛场次
let focusMatchNum_24 = ref<number>(0);
let focusMatchNum_1 = ref<number>(0);

const handelFocusMatch = (num: number) => {
  focusMatchNum_24.value++;
  if (num === 1) {
    focusMatchNum_1.value++;
  }
}
// provide 给 MatchStatus 调用
provide('handelFocusMatch', handelFocusMatch);

onMounted(() => {
  // fetchData({});
  const typeOptions_temp = computed(() => {
    return MatchData.map(ele => {
      return ele.leagueName;
    });
  });
  typeOptions.value = typeOptions_temp.value;
  console.log(typeOptions)
});
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
      font-size: 16px;
    }
  }

  >.set {
    text-align: center;
    min-height: 40px;
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: right;
    border-bottom: @border;

    >div {
      display: inline-block;
      margin-right: 20px;
    }
  }

  >.filter {
    text-align: center;
    min-height: 40px;
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: right;

    >div {
      display: inline-block;
      margin-right: 20px;
    }
  }

  >.table {
    width: 100%;
  }

  /deep/.select-num .el-input {
    width: 80px !important;
  }

  /deep/.select-type .el-input {
    width: 120px !important;
  }
}
</style>
<style lang="less"></style>