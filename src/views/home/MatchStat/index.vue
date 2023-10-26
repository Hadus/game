<template>
  <div class="wrapper">
    <div class="top">{{ curSeason }}赛季盘路汇总
      <el-button class="look-detail" type="primary" size="small" @click="handleLookDetail">查看详情</el-button>
    </div>
    <div class="bot">
      <div class="left">
        <h3>累计连赢</h3>
        <div>
          <el-table class="stat-table" :data="[homeSeasonSummaryW]" border style="width: 100%">
            <el-table-column :prop="key" :label="`${key} 场`" v-for="(item, key, index) in  homeSeasonSummaryW" :key="key"
              align="center" />
          </el-table>
        </div>
      </div>
      <div class="right">
        <h3>累计连败</h3>
        <div>
          <el-table class="stat-table" :data="[homeSeasonSummaryL]" border style="width: 100%">
            <el-table-column :prop="key" :label="`${key} 场`" v-for="(item, key, index) in  homeSeasonSummaryL" :key="key"
              align="center" />
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog v-model="detailDialogFlag" width="90%" center>
      <template #header="{ titleId, titleClass }">
        <div class="dialog-header">
          <h4 :id="titleId" :class="titleClass">赛季统计
            <el-select v-model="changeSeasonName" size="small" @change="handleChangeSeason()">
              <el-option v-for="item in seasonList" :key="item" :label="item" :value="item"
                :disabled="item == changeSeasonName" />
            </el-select>
          </h4>

        </div>
      </template>
      <div class="bot">
        <div class="left">
          <h3>累计连赢</h3>
          <div>
            <el-table class="stat-table" :data="[homeSeasonSummaryW]" border style="width: 100%">
              <el-table-column :prop="key" :label="`${key} 场`" v-for="(item, key, index) in  homeSeasonSummaryW"
                :key="key" align="center" />
            </el-table>
            <el-table class="stat-table stat-table-team" :data="[dialogData.seasonSummaryW]" border style="width: 100%"
              :show-header="false">
              <el-table-column :prop="key" :label="`${key} 场`" v-for="(item, key, index) in  homeSeasonSummaryW"
                :key="key" align="center">
                <template #default="{ row }">
                  <p v-for="(item_inner, index) in row[key]">{{ item_inner.leagueName + '-' + item_inner.teamName }}</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="right">
          <h3>累计连败</h3>
          <div>
            <el-table class="stat-table" :data="[homeSeasonSummaryL]" border style="width: 100%">
              <el-table-column :prop="key" :label="`${key} 场`" v-for="(item, key, index) in  homeSeasonSummaryL"
                :key="key" align="center" />
            </el-table>
            <el-table class="stat-table stat-table-team" :data="[dialogData.seasonSummaryL]" border style="width: 100%"
              :show-header="false">
              <el-table-column :prop="key" :label="`${key} 场`" v-for="(item, key, index) in  homeSeasonSummaryL"
                :key="key" align="center">
                <template #default="{ row }">
                  <p v-for="(item_inner, index) in row[key]">{{ item_inner.leagueName + '-' + item_inner.teamName }}</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="matchBlock">
import { defineProps, ref, reactive, watch } from 'vue';
import data from '@/mock/detail'

import { fetchDetail } from '@/api';
const { curSeason, homeSeasonSummaryW, homeSeasonSummaryL } = defineProps({
  curSeason: {
    type: String,
    required: true
  },
  homeSeasonSummaryW: {
    type: Object,
    required: true
  },
  homeSeasonSummaryL: {
    type: Object,
    required: true
  },
});
// 调用：获取统计数据
const api_fetchDetail = (sensonName = '2023-2024') => {
  fetchDetail({ sensonName }).then((res) => {
    console.log(res)
    dialogData.value = data
  }).catch((error) => {
    console.log(error)
  })
}
const detailDialogFlag = ref<boolean>(false);
const dialogData = ref({});
const handleLookDetail = () => {
  detailDialogFlag.value = true;
  dialogData.value = data
  api_fetchDetail('2023-2024');
}

const seasonList = ref(['2023-2024', '2024-2025']);
const changeSeasonName = ref(curSeason.value)
const handleChangeSeason = () => {
  api_fetchDetail(changeSeasonName.value)
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

.stat-table-team {
  border-top: 0 none;

  p {
    padding-left: 0 !important;
    // border-bottom: @border;
  }
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