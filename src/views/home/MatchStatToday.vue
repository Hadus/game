<template>
  <div class="wrapper">
    <div class="top">
      <p>连赢队伍</p>
      <p>连败队伍</p>
    </div>
    <div class="bot">
      <p>{{ winTeam }}</p>
      <p>{{ loseTeam }}</p>
    </div>
  </div>
</template>

<script setup lang="ts" name="MatchStatToday">
import { defineProps, ref } from 'vue';
const { winTeam, loseTeam } = defineProps({
  winTeam: {
    type: Number,
    required: true
  },
  loseTeam: {
    type: Number,
    required: true
  }
});
const list = [{
  win: 3, lose: 4
}]
</script>
<style lang="less" scoped>
@borderTable: 1px solid #606266;

.wrapper {
  width: 200px;
  height: 60px;
  border: @borderTable;
  text-align: center;

  >div {
    width: 100%;
    height: 50%;
    display: flex;
    line-height: 30px;

    &:first-child {
      border-bottom: @borderTable;
    }

    >p {
      flex: 1;
      height: 100%;

      &:first-child {
        border-right: @borderTable;
      }
    }
  }
}
</style>
<style lang="less"></style>