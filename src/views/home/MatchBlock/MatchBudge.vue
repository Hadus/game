
<template>
  <sup class="badge" v-if="budgeIndex >= 4" :class="className">
    {{ budgeIndex }}
  </sup>
</template>

<script setup lang="ts" name="MatchStatus">
import { defineProps, computed } from 'vue';
const { budgeIndex } = defineProps({
  budgeIndex: {
    type: Number,
    required: true
  }
});

const className = computed(() => {
  return 'color' + (budgeIndex);
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