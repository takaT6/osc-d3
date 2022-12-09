<template>
  <div :id="Const.GRAPH_ID"></div>
  <div class="controller">
    <button
      :class="[chartController.isConnect.value ? Const.BTN_DISABLED : Const.BTN_ABLED]" 
      id="connect"
      @click="chartController.connect"
    >
      Connect
    </button>
    <button
      :class="[(!chartController.isConnect.value || chartController.isProcess.value) ? Const.BTN_DISABLED : Const.BTN_ABLED]" 
      id="disconnect"
      @click="chartController.disconnect"
    >
      Disconnect
    </button>
  </div>
  <br>
  <div class="controller">
    <button
      :class="[(!chartController.isConnect.value || chartController.isProcess.value) ? Const.BTN_DISABLED : Const.BTN_ABLED]" 
      id="run"
      @click="chartController.run"
    >
      run
    </button>
    <button
    :class="[(!chartController.isConnect.value || !chartController.isProcess.value) ? Const.BTN_DISABLED : Const.BTN_ABLED]" 
      id="stop"
      @click="chartController.stop"
    >
      stop
    </button>
  </div>
  <br>
</template>

<script setup lang="ts" >
import { onMounted, watch, toRefs, reactive } from "vue";
// import { useChartStore } from "@/store/store";
import { storeToRefs } from 'pinia';
import { Const } from '@/components/common';
import { ChartController } from '@/components/chart';

// const chartStore = useChartStore();

// const { isProcess, isConnect } = storeToRefs(chartStore);

const chartController = new ChartController();

onMounted(()=> {
  chartController.initChart();
  // chartController.initD3Chart();
});







// const store = useOscContorllerStore();
// const { getPlotlyData, plotData } = store;
// let { mySharedChart } = store
// const { isProcess } = storeToRefs(store);

// const optionStore = useChartOptionStore();
// const { getChartOption } = optionStore;
// const chartOption = reactive(optionStore.chartOption);

// let chartDom = document.getElementById(Const.GRAPH_ID) as HTMLCanvasElement;

// let myChart = chartDom ? echarts.init(chartDom, undefined, {useDirtyRect:true, devicePixelRatio:1}) : undefined;
// mySharedChart = myChart;
// const xArray = [0, 10, 20, 30, 40, 50];
// const yArray = [5, 20, 36, 10, 10, 20];
// /* 
// const xTypedArray = new Float32Array(xArray);
// const yTypedArray = new Float32Array(yArray); */
// const data = new Float32Array(xArray.length * 2);
// for (let i = 0; i < xArray.length; i++) {
// 	data[i * 2] = xArray[i];
// 	data[i * 2 + 1] = yArray[i];
// }
// // const plotlyData = getPlotlyData();
// const option = {
//   xAxis: {
//   },
//   yAxis: {},
//   series: [{
//     name: 'Line',
//     type: 'line',
//     dimensions: ['xDim', 'yDim'],
//     encode: {
//       x: 'xDim',
//       y: 'yDim'
//     },
//         showSymbol: false,
//         symbol: 'none',
//     // data: plotlyData
//   }]
// };
// onMounted(()=> {
//   chartDom ?? (chartDom = document.getElementById(Const.GRAPH_ID) as HTMLCanvasElement);
//   myChart = echarts.init(chartDom, undefined, {useDirtyRect:true, devicePixelRatio:1});
//   // myChart.setOption(optionStore.chartOption);
//   myChart.setOption(option);
//   newFrame();
// });

// // const plotlyData = getPlotlyData();
// const newFrame = (): void => {
//   const plotlyData = getPlotlyData();
//   // console.log(plotlyData)
//   myChart?.setOption({
//     // xAxis: { data: plotlyData.x },
//     // series:{ data: plotlyData.y }
//     // xAxis: {},
//     // yAxis: {},
//     series: {
//       // type: 'line',
//       // dimensions: ['xDim', 'yDim'],
//       // encode: {
//       //   x: 'xDim',
//       // y: 'yDim'
//       // },
//       data: plotlyData
//     }
//   });
//   if(store.isProcess)requestAnimationFrame(newFrame);
// };

// watch(isProcess, () => {
//   console.log("wath isProcess", store.isProcess);
//   newFrame();
// });

// watch(chartOption, () => {
//   // console.log("wath option");
//   myChart?.setOption(getChartOption());
//   newFrame();
// });

</script>

<style scoped lang="scss">
#graph {
  width: auto;
  height: 40vh;
}
</style>
