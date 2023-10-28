
<template>
  <sup class="badge" v-if="budgeIndex >= minConsecutiveNumber" :class="className">
    {{ nearFlagList[budgeIndex - minConsecutiveNumber] }}
  </sup>
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