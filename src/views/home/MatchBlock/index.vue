<template>
  <div class="wrapper">
    <div class="top">{{ teamsData.leagueName }}</div>
    <div class="bot">
      <div class="left">
        <h3>连赢</h3>
        <div>
          <el-table class="match-table" :data="winList" border style="width: 100%">
            <el-table-column prop="teamName" label="球队" width="160" />
            <el-table-column prop="consecutiveCount" label="连赢" width="100" />
            <el-table-column label="近期比赛">
              <template #default="{ row }">
                <p class="match-item" v-if="row.nextMatchTime">
                  {{ row.nextMatchTime + ' | ' + row.nextMatchInfo }}
                  <match-status :nextMatchTimeStr="row.nextMatchTime" />
                </p>
                <p class="match-item" v-for="(match, index) in row.matchDetails">
                  <match-budge :budgeIndex="row.matchDetails.length - index" />
                  {{ match }}
                </p>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="right">
        <h3>连败</h3>
        <div>
          <el-table class="match-table" :data="loseList" border stripe style="width: 100%">
            <el-table-column prop="teamName" label="球队" width="160" />
            <el-table-column prop="consecutiveCount" label="连赢" width="100" />
            <el-table-column label="近期比赛">
              <template #default="{ row, $index }">
                <p class="match-item" v-if="row.nextMatchTime">
                  {{ row.nextMatchTime + ' | ' + row.nextMatchInfo }}
                  <match-status :nextMatchTimeStr="row.nextMatchTime" />
                </p>
                <p class="match-item" v-for="(match, index) in row.matchDetails">
                  <match-budge :budgeIndex="row.matchDetails.length - index" />
                  {{ match }}
                </p>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="matchBlock">
import { defineProps, ref, reactive } from 'vue';
import MatchStatus from './MatchStatus.vue';
import MatchBudge from './MatchBudge.vue';

const { teamsData } = defineProps({
  teamsData: {
    type: Object,
    required: true
  }
});
const { matchesW: winList, matchesL: loseList } = teamsData;
</script>
<style lang="less" scoped>
// 变量
@botDivPadding: 10px 20px;

.wrapper {
  width: 100%;
  height: auto;
  border-bottom: @border;

  >.top {
    @bdr: 8px;
    width: 100%;
    line-height: 40px;
    background-color: @mainBgc;
    color: #fff;
    text-align: center;
    border-bottom: @border;
    font-size: 16px;
    border-radius: @bdr @bdr 0px 0px;
  }

  >.bot {
    width: 100%;
    height: auto;
    display: flex;

    >div {
      width: 50%;

      >h3 {
        background-color: @mainBgc;
        color: #fff;
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

          >sup {
            position: absolute;
            left: 0;
            top: 5px;
          }

          >i {
            margin-left: 5px;
          }
        }

        p.match-item+p {
          border-top: @border;
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
}

.match-table {
  border: 1px solid #606266;
  width: 100%;
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