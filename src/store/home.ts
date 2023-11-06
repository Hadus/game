import { defineStore } from 'pinia';

export const useHomeStore = defineStore('user', {
  state: () => {
    return {
      focusMatch: {
        focusMatchList_24: [],
        focusMatchList_1: [],
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
      }
    },
    handleAddFocusMatch(hour: Boolean, teamId: number, focusFlag: boolean) {
      const list = this.focusMatch['focusMatchList_' + hour]
      const includsIndex = list.indexOf(teamId);
      let isUnfocus = false
      // isUnfocus =  this.unFocusTeams.includes(teamId)
      if (includsIndex != -1 || isUnfocus) return;
      list.push(teamId)
      this.focusMatch['focusMatchList_' + hour] = list
    },
    handleSwitchFocusMatch(teamId: number, focusFlag: boolean) {
      // const list_24 = this.focusMatch['focusMatchList_' + 24]
      // const list_1 = this.focusMatch['focusMatchList_' + 1]

      // const includsIndex_24 = list_24.indexOf(teamId);
      // const includsIndex_1 = list_1.indexOf(teamId);
      // if (focusFlag) { // 添加关注
      //   if (includsIndex_24 == -1) list_24.push(teamId);
      //   if (includsIndex_1 == -1) list_1.push(teamId);
      // } else { // 取消关注
      //   if (includsIndex_24 != -1) list_24.splice(includsIndex_24, 1);
      //   if (includsIndex_1 != -1) list_24.splice(includsIndex_1, 1);
      // }
    },
    handelSetUnFocusTeam(unFocusTeams: string) {
      this.unFocusTeams = unFocusTeams
    }
  }
});
