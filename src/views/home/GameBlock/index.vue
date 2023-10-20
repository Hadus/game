<template>
  <div class="wrapper">
    <div class="top">{{ teamData.leagueName }}</div>
    <div class="bot">
      <div class="left">
        <h3>连胜</h3>
        <div>
          <el-table :data="winList" border stripe style="width: 100%">
            <el-table-column prop="teamName" label="球队" width="160" />
            <el-table-column prop="consecutiveCount" label="连赢" width="100" />
            <el-table-column label="近期比赛">
              <template #default="{ row }">
                <p class="game-item" v-for="(game, index) in row.matchDetails">
                  <i class="icon icon-naozhong"></i>
                  {{ game }}
                </p>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="right">
        <h3>连败</h3>
        <div>
          <el-table :data="loseList" border stripe style="width: 100%">
            <el-table-column prop="teamName" label="球队" width="160" />
            <el-table-column prop="consecutiveCount" label="连赢" width="100" />
            <el-table-column label="近期比赛">
              <template #default="{ row }">
                <p class="game-item" v-for="(game, index) in row.matchDetails">{{ game }}</p>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="GameBlock">
import { defineProps } from 'vue';
const { teamData } = defineProps({
  teamData: {
    type: Object,
    required: true
  }
});

const { matchesW: winList, matchesL: loseList } = teamData;
const tableData = [
  {
    "teamId": 55,
    "teamName": "普雷斯顿",
    "consecutiveCount": 4,
    "consecutiveFlag": null,
    "nextMatchTime": "2023-10-26 00:00",
    "nextMatchInfo": "普雷斯顿 VS 南安普敦",
    "nextConsecutiveFlag": "1",
    "matchDetails": [
      "2023-10-07 22:00 | 伊普斯维奇 VS 普雷斯顿",
      "2023-10-05 02:45 | 莱斯特城 VS 普雷斯顿",
      "2023-09-30 22:00 | 普雷斯顿 VS 西布罗姆维奇",
      "2023-09-23 22:00 | 罗瑟汉姆 VS 普雷斯顿"
    ]
  }
];
</script>
<style lang="less" scoped>
// 变量
@titleBgc: #3074b3;
@botDivPadding: 10px 20px;

.wrapper {
  width: 100%;
  height: auto;
  border-bottom: @border;

  >.top {
    width: 100%;
    line-height: 40px;
    background-color: @titleBgc;
    color: #fff;
    text-align: center;
    border-bottom: @border;
  }

  >.bot {
    width: 100%;
    height: auto;
    display: flex;

    >div {
      flex: 1;

      >h3 {
        background-color: @titleBgc;
        color: #fff;
        text-align: center;
        line-height: 30px;
      }

      >div {
        padding: @botDivPadding;

        p {
          line-height: 30px;
          position: relative;

          .icon {
            // position: absolute;
            left: 0;
            right: 0;
          }
        }

        p.game-item+p {
          border-top: @border;
        }
      }
    }

    >div+div {
      border-left: @border;
    }

    >.left {}

    >.right {}
  }
}
</style>
<style lang="less"></style>