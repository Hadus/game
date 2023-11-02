
<template>
  <sup class="badge"
    v-if="(budgeIndex - minConsecutiveNumber) - 1 >= 0 && budgeIndex - minConsecutiveNumber <= nearFlagList.length"
    :class="className">
    {{ nearFlagList[budgeIndex - minConsecutiveNumber - 1] }} </sup>
</template>

<script setup lang="ts" name="MatchStatus">
import { onMounted, defineProps, computed, ref, reactive, inject } from 'vue';
const { budgeIndex, minConsecutiveNumber } = defineProps({
  budgeIndex: {
    type: Number,
    required: true
  },
  minConsecutiveNumber: {
    type: String,
    required: true
  },
});
// length: 10  
// index:       0 1 2 3 4 5 6 7 8 9
// budgeIndex: 10 9 8 7 6 5 4 3 2 1
// minConsecutiveNumber: 4
// budgeIndex - minConsecutiveNumber:     6 5 4 3 2 1
// budgeIndex - minConsecutiveNumber - 1: 5 4 3 2 1 0
// {4: 0, 5: 1, 6: 3, 7: 7, 8: 15, 9: 31}
let nearFlagList = reactive([1, 3, 7, 15, 31])
const className = computed(() => {
  return 'color' + (budgeIndex);
})

onMounted(() => {
})
</script>
<style lang="less" scoped>
@width: 18px;

sup.badge {
  display: inline-block;
  width: @width;
  height: @width;
  border-radius: 50%;
  text-align: center;
  line-height: @width;
  color: #fff;
  font-size: 12px;
}
</style>
<style lang="less"></style>