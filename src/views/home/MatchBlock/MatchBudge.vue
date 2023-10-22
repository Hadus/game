
<template>
  <sup class="badge" v-if="budgeIndex >= 4" :class="`level${budgeIndex <= 7 ? budgeIndex : 7}`">
    {{ budgeIndex }}
  </sup>
</template>

<script setup lang="ts" name="MatchStatus">
import { defineProps, defineEmits, ref, reactive } from 'vue';
const { budgeIndex } = defineProps({
  budgeIndex: {
    type: Number,
    required: true
  }
});

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

  &.level4 {
    background-color: #79bbff;
  }

  &.level5 {
    background-color: #f3d19e;
  }

  &.level6 {
    background-color: #f89898;
  }

  &.level7 {
    background-color: #c45656;
  }
}
</style>
<style lang="less"></style>