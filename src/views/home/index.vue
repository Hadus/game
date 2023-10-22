<template>
  <div class="main-content scroll">
    <h3>球队连赢连输分析（需关注的比赛：{{ focusMatchNum }} 场）</h3>
    <div class="filter">
      <div>
        类型选择：
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
            :disabled="item.disabled">
          </el-option>
        </el-select>
      </div>
      <div>
        球队选择：
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
            :disabled="item.disabled">
          </el-option>
        </el-select>
      </div>
      <div>
        场次选择：
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
            :disabled="item.disabled">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-button type="primary">筛选</el-button>
      </div>
    </div>
    <div class="table">
      <match-block :teamsData="teams" v-for="(teams, index) in MatchData" :key="index"></match-block>
    </div>
  </div>
</template>

<script setup lang="ts" name="home">
import { ref, provide } from 'vue'

import MatchBlock from './MatchBlock';
import MatchData from '@/mock/data.json';

const value = ref('');
const options = [{
  value: '选项1',
  label: '黄金糕'
}, {
  value: '选项2',
  label: '双皮奶',
  disabled: true
}, {
  value: '选项3',
  label: '蚵仔煎'
}, {
  value: '选项4',
  label: '龙须面'
}, {
  value: '选项5',
  label: '北京烤鸭'
}];

// 需要关注的比赛场次
let focusMatchNum = ref<number>(0);
const handelFocusMatch = () => {
  focusMatchNum.value++;
}
// provide 给 MatchStatus 调用
provide('handelFocusMatch', handelFocusMatch);
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
    font-weight: blod;
  }

  >.filter {
    text-align: center;
    min-height: 40px;
    padding-top: 40px;
    padding-bottom: 10px;

    >div {
      display: inline-block;
      margin-right: 20px;
    }
  }

  >.table {
    width: 100%;
  }
}
</style>
<style lang="less"></style>