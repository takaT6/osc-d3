<template>
  <div class="chart-area">
    <LineChart/>
  </div>
</template>

<script setup lang="ts">
import LineChart from './LineChart.vue';

</script>

<style scoped lang="scss">
#chart-info {
	margin: 16px auto;
	text-align: center;
	display: block;
}
.text-left {
  text-align: left;
	display: inline-block;
}
.chart-area {
  background-color: black;
  text-align: center;
}
</style>
