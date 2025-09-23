import { defineStore } from 'pinia';

export const useDataStore = defineStore('index', {
  state: () => ({
    data: {
      solutions: [],
      services: []
    },
    currentMenuFloatItem: null
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