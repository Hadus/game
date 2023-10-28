
<template>
  <sup class="badge" v-if="budgeIndex > 4" :class="className">
    {{ nearFlag[budgeIndex] }}
  </sup>
</template>

<script setup lang="ts" name="MatchStatus">
import { defineProps, computed, ref, reactive } from 'vue';
const { budgeIndex } = defineProps({
  budgeIndex: {
    type: Number,
    required: true
  }
});

let nearFlag = reactive({
  4: 0, 5: 1, 6: 3, 7: 7, 8: 15, 9: 31
})

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