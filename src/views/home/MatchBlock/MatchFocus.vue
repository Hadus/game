<template>
  <el-switch v-model="focusFlag_now" style="--el-switch-on-color: #13ce66; float:right" @change="handelSwitchFocus()" />
</template>

<script setup lang="ts" name="matchFocus">
import { defineProps, ref, reactive, inject } from 'vue';
import { useHomeStore } from '@/store/home';
import { fetchRemoveFocus } from '@/api';

const { teamId, focusFlag } = defineProps({
  focusFlag: {
    type: Boolean,
    required: true
  },
  teamId: {
    type: Number,
    required: true
  },
});

const focusFlag_now = ref(focusFlag)
const home = useHomeStore();
const handleSwitchAlert = inject<Function>('handleSwitchAlert');

const handelSwitchFocus = () => {
  console.log(focusFlag_now.value)
  fetchRemoveFocus({
    teamId: teamId,
    unfocusTeam: !focusFlag_now.value
  }).then((res) => {
    home.handleSwitchFocusMatch(teamId, focusFlag_now.value)
    handleSwitchAlert()
  }).catch((error) => {
    console.log(error);
    focusFlag_now.value = !focusFlag_now.value;
  });
}
</script>
<style lang="less" scoped></style>
<style lang="less"></style>