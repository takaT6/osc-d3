<template>
  <!-- <div class="chart-area"> -->
    <!-- <LineChart/> -->
  <!-- </div> -->
  <!-- <div class=""> -->
  <!-- <LineChartTest5/> -->
  <!-- <LineChart2/> -->
  <LineChart3/>
  <!-- </div> -->
</template>

<script setup lang="ts">
import LineChart from './LineChart.vue';
import LineChart2 from './LineChart2.vue';

import LineChart3 from './LineChart3.vue';
// import LineChartTest5 from './LineChartTest5.vue';

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
