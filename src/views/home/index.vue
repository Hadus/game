<template>
  <div class="main-content scroll">
    <h3>球队连赢连输分析</h3>
    <div class="filter">filter</div>
    <div class="table">
      <game-block :teamData="team" v-for="(team, index) in gameData" :key="index"></game-block>
    </div>
  </div>
</template>

<script setup lang="ts" name="home">
import GameBlock from './GameBlock';
import gameData from '@/mock/data.json';
</script>
<style lang="less" scoped>
// 变量
@botPadding: 20px;

.main-content {
  width: 100%;
  height: 100%;
  padding: @botPadding;

  >h3 {
    text-align: center;
    line-height: 50px;
  }

  >.filter {
    text-align: center;
    height: 40px;
  }

  >.table {
    width: 100%;
  }
}
</style>
<style lang="less"></style>