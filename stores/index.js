import { defineStore } from 'pinia';

export const useMainStore = defineStore('index', {
  state: () => ({
    currentMenuFloatItem: {}
  }),
  getters: {
    menuCardItem: state => state.currentMenuFloatItem
  },
  actions: {
    setCurrentMenuFloatItem(item) {
      this.currentMenuFloatItem = item
    },
  },
});