import { ref, reactive, toRefs } from 'vue';
import { defineStore } from 'pinia';
import { Const } from '@/script/common';

export const useChartStore = defineStore('chartStore', () => {
  const isConnect = ref(false);

  const isProcess = ref(false);

  return {
    isProcess,
    isConnect
  }
})