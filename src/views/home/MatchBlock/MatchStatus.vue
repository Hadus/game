<template>
  <i class="match-status" :class="className">
    {{ matchStatus }}
  </i>
</template>

<script setup lang="ts" name="MatchStatus">
import { defineProps, ref, inject } from 'vue';
const { nextMatchTimeStr } = defineProps({
  nextMatchTimeStr: {
    type: String,
    required: true
  }
});
const handelFocusMatch = inject<Function>('handelFocusMatch');


let className = ref('');
let matchStatus = ref('');
const now = new Date().getTime();
const nextMatchTime = new Date(nextMatchTimeStr).getTime();

const gap = nextMatchTime - now;
const gapHours = gap / 1000 / 60 / 60;
if (gap <= 0) {
  className.value = 'going';
  matchStatus.value = '进行中';
  handelFocusMatch();
} else if (gapHours <= 24) {
  className.value = 'pending';
  matchStatus.value = '即将开赛';
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
    background-color: #E6A23C;
  }

  &.going {
    background-color: #F56C6C;
    animation: alert 1.2s ease-in-out infinite;
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