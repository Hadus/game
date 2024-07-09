import { defineStore } from 'pinia';

export const useHomeStore = defineStore('user', {
  state: () => {
    return {
      focusMatch: {
        focusMatchList_24: [],
        focusMatchList_1: [],
        focusMatchList_1_real: [],
      },
      unFocusTeams: ''
    };
  },
  getters: {

  },
  actions: {
    handleClearMatch() {
      this.focusMatch = {
        focusMatchList_24: [],
        focusMatchList_1: [],
        focusMatchList_1_real: [],
      }
    },
    handleAddFocusMatch(hour: Number, teamId: number) {
      const list = this.focusMatch['focusMatchList_' + hour];
      const includsIndex = list.indexOf(teamId);
      let isUnfocus = false;
      // isUnfocus =  this.unFocusTeams.includes(teamId)
      if (includsIndex != -1 || isUnfocus) return;
      list.push(teamId);
      this.focusMatch['focusMatchList_' + hour] = list;
      if (hour == 1 && !this.unFocusTeams.includes(teamId)) {
        this.focusMatch.focusMatchList_1_real.push(teamId);
      }
    },
    handleSwitchFocusMatch(teamId: number, focusFlag: boolean) {
      const list_1_real = this.focusMatch.focusMatchList_1_real;
      const includsIndex_1_real = list_1_real.indexOf(teamId);
      if (!this.focusMatch.focusMatchList_1.includes(teamId)) return;
      if (focusFlag) { // 添加关注
        if (includsIndex_1_real == -1) list_1_real.push(teamId);
      } else { // 取消关注
        if (includsIndex_1_real != -1) list_1_real.splice(includsIndex_1_real, 1);
      }
      this.focusMatch.focusMatchList_1_real = list_1_real;
    },
    handelSetUnFocusTeam(unFocusTeams: string) {
      this.unFocusTeams = unFocusTeams
    }
  }
});
