<template>
  <div class="wrapper">
    <div class="top">{{ teamsData.leagueName }}</div>
    <div class="bot">
      <div class="left">
        <h3>连赢</h3>
        <div>
          <el-table :data="winList" border stripe style="width: 100%">
            <el-table-column prop="teamName" label="球队" width="160" />
            <el-table-column prop="consecutiveCount" label="连赢" width="100" />
            <el-table-column label="近期比赛">
              <template #default="{ row }">
                <p class="match-item" v-if="row.nextMatchTime">
                  {{ row.nextMatchTime + ' | ' + row.nextMatchInfo }}
                  <i class="match-status" :class="nextMatchClass" v-if="!!handelNextMatchStatus(row.nextMatchTime)">{{
                    handelNextMatchStatus(row.nextMatchTime)
                  }}</i>
                </p>
                <p class="match-item" v-for="(match, index) in row.matchDetails">
                  <sup class="badge" v-if="(row.matchDetails.length - index) >= 4"
                    :class="`level${(row.matchDetails.length - index) <= 7 ? (row.matchDetails.length - index) : 7}`">
                    {{ row.matchDetails.length - index }}
                  </sup>
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
          <el-table :data="loseList" border stripe style="width: 100%">
            <el-table-column prop="teamName" label="球队" width="160" />
            <el-table-column prop="consecutiveCount" label="连赢" width="100" />
            <el-table-column label="近期比赛">
              <template #default="{ row }">
                <p class="match-item" v-if="row.nextMatchTime">
                  {{ row.nextMatchTime + ' | ' + row.nextMatchInfo }}
                  <i class="match-status" :class="nextMatchClass" v-if="!!handelNextMatchStatus(row.nextMatchTime)">{{
                    handelNextMatchStatus(row.nextMatchTime)
                  }}</i>
                </p>
                <p class="match-item" v-for="(match, index) in row.matchDetails">
                  <sup class="badge" v-if="(row.matchDetails.length - index) >= 4"
                    :class="`level${(row.matchDetails.length - index) <= 7 ? (row.matchDetails.length - index) : 7}`">
                    {{ row.matchDetails.length - index }}
                  </sup>
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
import { defineProps, ref } from 'vue';
const { teamsData } = defineProps({
  teamsData: {
    type: Object,
    required: true
  }
});

const { matchesW: winList, matchesL: loseList } = teamsData;

// handel next Match
let hasNextMatch = true;
let nextMatchClass = ref('');
const handelNextMatchStatus = (timeStr) => {
  if (!timeStr) return;
  const now = new Date().getTime();
  const nextMatchTime = new Date(timeStr).getTime();
  const gap = nextMatchTime - now;
  const gapHours = gap / 1000 / 60 / 60;
  if (gap <= 0) {
    nextMatchClass.value = 'going';
    return '进行中';
  } else if (gapHours <= 24) {
    nextMatchClass.value = 'pending';
    return '即将开赛';
  } else if (gapHours > 24) {
    nextMatchClass.value = 'next';
    return '下场比赛';
  }
  hasNextMatch = false;
  return '';
}

</script>
<style lang="less" scoped>
// 变量
@botDivPadding: 10px 20px;

.wrapper {
  width: 100%;
  height: auto;
  border-bottom: @border;

  >.top {
    width: 100%;
    line-height: 40px;
    background-color: @mainBgc;
    color: #fff;
    text-align: center;
    border-bottom: @border;
    font-size: 16px;
  }

  >.bot {
    width: 100%;
    height: auto;
    display: flex;

    >div {
      flex: 1;

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

    >.left {}

    >.right {}
  }
}
</style>
<style lang="less"></style>