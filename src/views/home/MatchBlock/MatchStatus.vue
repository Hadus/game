<template>
  <i class="match-status" :class="className">
    {{ matchStatus }}
  </i>
</template>

<script setup lang="ts" name="MatchStatus">
import { defineProps, ref, inject } from 'vue';
import { useHomeStore } from '@/store/home';
const homeStore = useHomeStore()

const { nextMatchTimeStr, isWin, teamId } = defineProps({
  nextMatchTimeStr: {
    type: String,
    required: true
  },
  isWin: {
    type: Boolean,
    required: false
  },
  teamId: {
    type: Number,
    required: true
  },
});

let className = ref('');
let matchStatus = ref('');
const now = new Date().getTime();
const nextMatchTime = new Date(nextMatchTimeStr).getTime();

const gap = nextMatchTime - now;
const gapHours = gap / 1000 / 60 / 60;
if (gap <= 0) {
  className.value = 'going';
  matchStatus.value = '比赛中';
} else if (gapHours <= 1) {
  className.value = homeStore.unFocusTeams.includes(teamId) ? 'pending' : 'pending warning'
  matchStatus.value = '预警中';
  homeStore.handleAddFocusMatch(1, teamId)
} else if (gapHours <= 24) {
  className.value = 'pending';
  matchStatus.value = '即将开赛';
  homeStore.handleAddFocusMatch(24, teamId)
} else if (gapHours > 24) {
  className.value = 'next';
  matchStatus.value = '下场比赛';
}

</script>
<style lang="less" scoped>
i.match-status {
  display: inline-block;
  width: 60px;
  line-height: 22px;
  border-radius: 4px;
  text-align: center;
  color: #fff;
  background-color: pink;
  font-size: 12px;

  &.next {
    background-color: #79bbff;
  }

  &.pending {
    background-color: #F56C6C;
  }

  &.warning {
    background-color: #F56C6C;
    animation: alert 1.2s ease-in-out infinite;
  }

  &.going {
    background-color: #95d475;
  }
}

@keyframes alert {
  0% {
    background-color: #F56C6C;
  }

  50% {
    background-color: #fcd3d3;
  }

  100% {
    background-color: #F56C6C;
  }
}
</style>
<style lang="less"></style>