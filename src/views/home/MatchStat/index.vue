<template>
  <div class="wrapper">
    <div class="top">{{ curSeason }}赛季 盘路汇总
      <el-button class="look-detail" type="primary" size="small" @click="handleLookDetail">查看详情</el-button>
    </div>
    <div class="bot">
      <div class="left">
        <h3>累计连赢</h3>
        <div>
          <el-table class="stat-table" :data="homeSeasonSummaryW" border style="width: 100%">
            <el-table-column :prop="key" :label="`${key} 场`" v-for="(item, key, index) in  homeSeasonSummaryW[0]"
              :key="key" align="center" />
          </el-table>
        </div>
      </div>
      <div class="right">
        <h3>累计连输</h3>
        <div>
          <el-table class="stat-table" :data="homeSeasonSummaryL" border style="width: 100%">
            <el-table-column :prop="key" :label="`${key} 场`" v-for="(item, key, index) in  homeSeasonSummaryL[0]"
              :key="key" align="center" />
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog v-model="detailDialogFlag" width="100%" top="5vh" center>
      <template #header="{ titleId, titleClass }">
        <div class="dialog-header">
          <h4 :id="titleId" :class="titleClass">{{ curSeason }}赛季 盘路统计
            <el-select v-model="changeSeasonName" size="small" @change="handleChangeSeason()" v-if="!!supportedSeason">
              <el-option v-for="item in supportedSeason" :key="item" :label="item" :value="item"
                :disabled="item == changeSeasonName" />
            </el-select>
          </h4>
        </div>
      </template>
      <div class="bot">
        <div class="left">
          <h3>累计连赢</h3>
          <div>
            <el-table class="stat-table stat-table-team" :data="[dialogData.seasonSummaryW]" border style="width: 100%">
              <el-table-column :prop="key" :label="`${key} 场`" v-for="(item, key, index) in  homeSeasonSummaryW[0]"
                :key="key" align="center">
                <template #default="{ row }">
                  <div v-if="row && row[key]">
                    <p v-for="(item_inner, index) in row[key]" class="item-inner">
                      <span class="game-time">
                        <el-tag size="small" type="info" effect="plain">{{ item_inner.lastMatchTime }}</el-tag>
                      </span>
                      {{ item_inner.leagueName + '-' + item_inner.teamName }}
                    </p>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="right">
          <h3>累计连输</h3>
          <div>
            <el-table class="stat-table stat-table-team" :data="[dialogData.seasonSummaryL]" border style="width: 100%">
              <el-table-column :prop="key" :label="`${key} 场`" v-for="(item, key, index) in  homeSeasonSummaryL[0]"
                :key="key" align="center">
                <template #default="{ row }">
                  <div v-if="row && row[key]">
                    <p v-for="(item_inner, index) in row[key]" class="item-inner">
                      <span class="game-time">
                        <el-tag size="small" type="info" effect="plain">{{ item_inner.lastMatchTime }}</el-tag>
                      </span>
                      {{ item_inner.leagueName + '-' + item_inner.teamName }}
                    </p>
                  </div>
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
import { defineProps, ref, reactive, watch, computed, toRefs, toRef } from 'vue';

import { fetchDetail } from '@/api';
const props = defineProps({
  curSeason: {
    type: String,
  },
  supportedSeason: {
    type: Array,
  },
  homeSeasonSummaryW: {
    type: Array,
  },
  homeSeasonSummaryL: {
    type: Array,
  },
});

const { curSeason, supportedSeason, homeSeasonSummaryW, homeSeasonSummaryL } = toRefs(props);

// 调用：获取统计数据
const api_fetchDetail = (season = '2023-2024') => {
  fetchDetail({ season }).then((res) => {
    dialogData.value = res.data
  }).catch((error) => {
    console.log(error)
  })
}
const detailDialogFlag = ref<boolean>(false);
let dialogData = ref({});
const handleLookDetail = () => {
  detailDialogFlag.value = true;
  api_fetchDetail('2023-2024');
}

let changeSeasonName = ref('')
watch(
  () => props.supportedSeason,
  () => {
    changeSeasonName.value = supportedSeason.value[0]
  }
)

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

  td {
    vertical-align: text-top;
  }

  td>.cell {
    padding: 0 !important;
  }

  .item-inner {
    font-size: 12px;
    position: relative;
    margin-top: 35px;
    line-height: 16px;

    .game-time {
      position: absolute;
      top: -21px;
      left: 2px;
    }
  }
}
</style>
<style lang="less"></style>