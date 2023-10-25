<template>
  <div class="wrapper">
    <div class="top">2023赛季 总体统计
      <el-button class="look-detail" type="primary" size="small" @click="handleLookDetail">查看详情</el-button>
    </div>
    <div class="bot">
      <div class="left">
        <h3>连赢统计</h3>
        <div>
          <el-table class="stat-table" :data="winList" border style="width: 100%">
            <el-table-column prop="name" label="name" width="100" />
            <el-table-column prop="num" label="num" width="100" />
          </el-table>
        </div>
      </div>
      <div class="right">
        <h3>连败统计</h3>
        <div>
          <el-table class="stat-table" :data="winList" border style="width: 100%">
            <el-table-column prop="name" label="name" width="100" />
            <el-table-column prop="num" label="num" width="100" />
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog v-model="detailDialogFlag" width="90%" center>
      <template #header="{ titleId, titleClass }">
        <div class="dialog-header">
          <h4 :id="titleId" :class="titleClass">统计</h4>
        </div>
      </template>
      <div class="bot">
        <div class="left">
          <h3>连赢统计</h3>
          <div>
            <el-table class="stat-table" :data="winList" border style="width: 100%">
              <el-table-column prop="name" label="name" width="100" />
              <el-table-column prop="num" label="num" width="100" />
            </el-table>
          </div>
        </div>
        <div class="right">
          <h3>连败统计</h3>
          <div>
            <el-table class="stat-table" :data="winList" border style="width: 100%">
              <el-table-column prop="name" label="name" width="100" />
              <el-table-column prop="num" label="num" width="100" />
            </el-table>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="matchBlock">
import { defineProps, ref, reactive } from 'vue';

import { fetchFocusMatch } from '@/api';
const { stat } = defineProps({
  stat: {
    type: Object,
    required: true
  }
});

const winList = [
  { name: '4', num: 12 },
];

const detailDialogFlag = ref<boolean>(false);
const handleLookDetail = () => {
  detailDialogFlag.value = true;
}
</script>
<style lang="less" scoped>
// 变量
@botDivPadding: 10px 20px;
@bgc: #d1edc4;

.wrapper {
  width: 100%;
  height: auto;
  border-bottom: @border;
}

.top {
  @bdr: 8px;
  width: 100%;
  line-height: 40px;
  background-color: @bgc;
  color: #000;
  text-align: center;
  border-bottom: @border;
  font-size: 16px;
  border-radius: @bdr @bdr 0px 0px;
  position: relative;

  >.look-detail {
    position: absolute;
    top: 8px;
    right: 8px;
  }
}

.bot {
  width: 100%;
  height: auto;
  display: flex;

  >div {
    width: 50%;

    >h3 {
      background-color: @bgc;
      color: #000;
      text-align: center;
      line-height: 30px;
      font-size: 15px;
    }

    >div {
      padding: @botDivPadding;

      p {
        line-height: 30px;
        position: relative;
        padding-left: 26px;
        position: relative;
      }
    }
  }

  >div+div {
    border-left: @border;
  }

  >.left {
    background-color: #ecf5ff;
  }

  >.right {
    background-color: #fef0f0;
  }
}

.stat-table {
  border: 1px solid #606266;
  width: 100%;
}

/deep/.el-dialog__body {
  padding-top: 0;
}

/deep/.el-table {
  background-color: transparent !important;
  border-color: #606266 !important;

  tr,
  td,
  th {
    background-color: transparent !important;
    border-color: #606266 !important;
  }

  th>.cell {
    color: #606266;
    font-weight: bold;
  }
}
</style>
<style lang="less"></style>