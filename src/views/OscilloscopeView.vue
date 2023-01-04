<template>
  <div class="chart-area">
    <DynamicLineChart/>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
// import DynamicLineChart from '@/components/DynamicLineChart.vue';
const DynamicLineChart = defineAsyncComponent(
  () => import('@/components/DynamicLineChart.vue')
);
</script>

<style scoped lang="scss">
.chart-area {
  width: auto;
}
</style>