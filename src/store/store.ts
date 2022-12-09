import { ref, reactive, toRefs } from 'vue';
import { defineStore } from 'pinia';
import { Const, PlotData } from '@/components/common';
import * as echarts from 'echarts';

export const useChartStore = defineStore('chartStore', () => {
  const isConnect = ref(false);

  const isProcess = ref(false);

  return {
    isProcess,
    isConnect
  }
})

// export const useOscContorllerStore = defineStore('oscContorller', () => {

//   console.log('make WebWorker Thread.')
//   // WebWorker  Instance
//   const wsWorker = new WebSocketWorker();
  
//   const isConnect = ref(false);

//   const isProcess = ref(false);

//   const plotData = new Float32Array([...new Array(5000*2)].map((_, i) => {
//     if(i%2) return i; //y
//     return i; //x
//   }));

//   // getter
//   const getIsConnect = (): boolean => isConnect.value;

//   //getter
//   const getIsProcess = (): boolean => isProcess.value;
  
//   //getter
//   // const getPlotlyData = (): PlotData => plotData;
//   const getPlotlyData = (): Float32Array => plotData

//   const postMessage = (mssg: string): void => {
//     wsWorker.postMessage({mssg:mssg});
//     console.log('main:', mssg);
//     if(mssg == 'connect'){
//       wsWorker.postMessage({'mssg':'ready', 'plotData': plotData}, [plotData.buffer]);
//     }
//   }

//   const chartDom = document.getElementById(Const.GRAPH_ID) as HTMLCanvasElement;
//   // let mySharedChart:echarts.ECharts | undefined;
//   // mySharedChart = chartDom ? echarts.init(chartDom, undefined, {useDirtyRect:true, devicePixelRatio:1}) : undefined;

//   wsWorker.onmessage = (event: MessageEvent): void => {
//     switch (event.data.type) {
//       case 'plotData':
//         // plotData = event.data.value;
//         // plotData = {x: event.data.x, y: event.data.y}
//         // const copyData = event.data.plotData;
//         // for(let i=0, len=event.data.plotData.length; i<len; i++){
//         //   plotData[i] = event.data.plotData[i]
//         // }
//         // mySharedChart?.setOption({
//         //   series: {
//         //     data: event.data.plotData
//         //   }
//         // });
//         // console.log(event.data.plotData)
//         // plotData = event.data.plotData;
//         break;
//       case 'isConnect':
//         isConnect.value = event.data.value;
//         break;
//       case 'isProcess':
//         isProcess.value = event.data.value;
//         break;
//       case 'count': 
//         console.log(event.data.value);
//         break;
//       // case 'ready':
//       //   wsWorker.postMessage({'mssg':'ready', 'plotData': plotData}, [plotData.buffer]);
//       //   break;
//     }
//   }

//   return {
//     // mySharedChart,
//     getIsConnect,
//     getIsProcess,
//     getPlotlyData,
//     postMessage,
//     isProcess,
//     isConnect,
//     plotData,
//   }
// });

export const useChartOptionStore = defineStore('chartOption', () => {
  type EChartsOption = echarts.EChartsOption
  const chartOption = reactive({
    title: { 
      text: 'Web Osillo',
      textStyle:{
        color: '#ffffff'
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {},
      },
      iconStyle: {
        borderColor: '#ffffff'
      },
      showTitle: false
    },
    animation: false,
    xAxis: {
      // data: [],
      axisLabel: {
        formatter: (d: any) => Number(d).toFixed(2),
        interval: 1000,
        align: 'center',
        color: '#ffffff',
        show: true
      },
      // scale: true
    },
    yAxis: {
      name: "mV",
      nameLocation: "middle",
      axisLabel: {
        color: '#ffffff',
        show: true
      },
    },
    series: [
      {
        dimensions: ['xDim', 'yDim'],
        encode: {
          x: 'xDim',
          y: 'yDim'
        },
        name: 'mV',
        // data: [],
        type: 'line',
        showSymbol: false,
        symbol: 'none',
        color: '#00FF00'
      },
      {
        name: 'markline',
        type: 'line',
        showSymbol: false,
        symbol: 'none',
        color: '#ff0000',
        markLine: {
          symbol: 'none',
          data: [{
                  name: '', 
                  yAxis: 0.301,
                }],
        }
      }
    ],
    backgroundColor: '#000000',
  });

  const showXaxis = (show: boolean): void => {
    chartOption.xAxis.axisLabel.show = show;
  }

  const showYaxis = (show: boolean): void => {
    chartOption.yAxis.axisLabel.show = show;
  }

  const markLineYvalue = (value: number): void => {
    chartOption.series[1].markLine!.data[0].yAxis = value;
  }

  const markLineXvalue = (value: number): void => {
    chartOption.series[1].markLine!.data[0].yAxis = value;
  }

  //getter
  const getChartOption = () => chartOption;

  return { 
    chartOption, 
    getChartOption,
    showXaxis,
    showYaxis,
    markLineYvalue
  }
});