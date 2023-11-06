<template>
  <el-switch v-model="focusFlag" style="--el-switch-on-color: #13ce66; float:right"
    @change="handelSwitchFocus(focusFlag)" />
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

const home = useHomeStore();
const handleSwitchAlert = inject<Function>('handleSwitchAlert');

const handelSwitchFocus = (focusFlag) => {
  fetchRemoveFocus({
    teamId: teamId,
    unfocusTeam: !focusFlag
  }).then((res) => {
    home.handleSwitchFocusMatch(teamId, focusFlag)
    handleSwitchAlert()
  }).catch((error) => {
    focusFlag = !focusFlag;
    console.log(error);
  });
}
</script>
<style lang="less" scoped></style>
<style lang="less"></style>