<template>
  <div id="chart-area">
    <button
      id="csv-btn"
      :class="TW.BTN_ABLED"
    >select csv file</button>
    <div id="osc-static-chart"></div>
    <button
        id="download-btn"
        :class="TW.BTN_ABLED" 
        @click="saveSVGasPNG"
    >download</button>
  </div>
  <div id="config-area">
    <div id="accordion-collapse" class="flex-config" data-accordion="collapse">
      <div class="config">
        <h2 id="accordion-collapse-heading-1">
          <button type="button" :class="TW.ACCORDION_HEAD" data-accordion-target="#accordion-collapse-body-1" aria-expanded="false" aria-controls="accordion-collapse-body-1">
            <span>Y Axis Range/ Markline</span>
            <svg data-accordion-icon class="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
        </h2>
        <div id="accordion-collapse-body-1" class="hidden" aria-labelledby="accordion-collapse-heading-1">  
          <div :class="TW.ACCORDION_BODY" class="justify-center">
            <div class="flex justify-center">
              <div class="justify-center flex-col">
              <label :class="TW.LABEL">markline</label>
              <input :class="TW.INPUT" class="" type="number" v-model="chartUtil.marklineVal.value" style="width: 100px;">
              </div>
            </div>
            <div class="flex justify-center flex-row">
              <label :class="TW.LABEL">Min</label>
              <input :class="TW.INPUT" id="y-axis-min" type="number" v-model="chartUtil.yAxis.min" style="width: 100px;">
              <div class="flex items-center">
                <input :class="TW.RANGE" id="steps-range" type="range" :min="chartUtil.yAxis.min" :max="chartUtil.yAxis.max" v-model="chartUtil.marklineVal.value" step="0.001">
              </div>
              <input :class="TW.INPUT" id="y-axis-max" type="number" v-model="chartUtil.yAxis.max" style="width: 100px;">
              <label :class="TW.LABEL">Max</label>
            </div>
          </div>
        </div>
        <h2 id="accordion-collapse-heading-2">
          <button type="button" :class="TW.ACCORDION_HEAD" data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2">
            <span>Y Axis Style</span>
            <svg data-accordion-icon class="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
        </h2>
        <div id="accordion-collapse-body-2" class="hidden" aria-labelledby="accordion-collapse-heading-2">
          <div :class="TW.ACCORDION_BODY">
            <div class="flex justify-center flex-row">
              <div class="w-1/6 md:w-1/3 px-3 mb-6 md:mb-0" style="width: 110px;">
                  <label :class="TW.LABEL" for="y-axis-ticks">Y Ticks</label>
                  <input :class="TW.INPUT" id="y-axis-ticks" type="number" placeholder="" v-model="chartUtil.yAxis.ticks">
              </div>
              <div class="w-1/6 md:w-1/3 px-3 mb-6 md:mb-0" style="width: 110px;">
                  <label :class="TW.LABEL" for="y-axis-fontsize">Y Font Size</label>
                  <input :class="TW.INPUT" id="y-axis-fontsize" type="number" placeholder="" v-model="chartUtil.yAxis.fontsize">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="config">
        <h2 id="accordion-collapse-heading-3">
          <button type="button" :class="TW.ACCORDION_HEAD" data-accordion-target="#accordion-collapse-body-3" aria-expanded="false" aria-controls="accordion-collapse-body-3">
            <span>X Axis Style</span>
            <svg data-accordion-icon class="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
        </h2>
        <div id="accordion-collapse-body-3" class="hidden" aria-labelledby="accordion-collapse-heading-3">
          <div :class="TW.ACCORDION_BODY">
            <div class="flex justify-center flex-row">
              <div class="w-1/6 md:w-1/3 px-3 mb-6 md:mb-0" style="width: 110px;">
                  <label :class="TW.LABEL" for="x-axis-ticks">X Ticks</label>
                  <input :class="TW.INPUT" id="x-axis-ticks" type="number" placeholder="" v-model="chartUtil.xAxis.ticks">
              </div>
              <div class="w-1/6 md:w-1/3 px-3 mb-6 md:mb-0" style="width: 110px;">
                  <label :class="TW.LABEL" for="x-axis-fontsize">X Font Size</label>
                  <input :class="TW.INPUT" id="x-axis-fontsize" type="number" placeholder="" v-model="chartUtil.xAxis.fontsize">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" >
import { onMounted } from "vue";
import { Const, TW, saveSVGasPNG } from '@/script/common';
import { StaticChartUtil } from '@/script/chartUtil';
import { PlotDataFormat } from '@/script/common';
import * as d3 from 'd3';

const pickerOpts = {
  types: [
    {
      description: 'csvのみやで',
      accept: {
        'text/csv': ['.csv']
      }
    }
  ],
  excludeAcceptAllOption: true,
  multiple: false,
}
const chartUtil = new StaticChartUtil();

onMounted(()=> {
  chartUtil.initRenderer();
document.getElementById("csv-btn")!.addEventListener("click", async (e) => {
  //これ参考
  //https://nulab.com/ja/blog/nulab/blog-relay-file-system-access-api/
  const [fileHandle] = await window.showOpenFilePicker(pickerOpts);
  const file = await fileHandle.getFile();
  const text = await file.text();
  const array: Array<PlotDataFormat>  = convertCSVtoArray(text)
  console.log(array)
  chartUtil.dataArr = array;
  const yMin = d3.min(array, (d:PlotDataFormat) => { return d.channel1; }) as number;
  const yMax = d3.max(array, (d:PlotDataFormat) => { return d.channel1; }) as number;
  chartUtil.yAxis.max = yMax + 10;
  chartUtil.yAxis.min = yMin - 10;
  chartUtil.rerender();
  console.log(chartUtil.dataArr);
});
});
// 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
function convertCSVtoArray(str:string):PlotDataFormat[]{ // 読み込んだCSVデータが文字列として渡される
    const result = []; // 最終的な二次元配列を入れるための配列
    const tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成
 
    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    // for(let i=0;i<tmp.length;++i){
    //     result[i] = tmp[i].split(',');
    // }
    const dataArr: Array<PlotDataFormat> = [];

    let starttime = 0;
    for(let i=0;i<tmp.length;++i){
      const split = tmp[i].split(',');
      const splittime = split[0].split(':');
      const time = Number(splittime[0]) * 60 * 60 + Number(splittime[1]) * 60 + Number(splittime[2])
      
      if(i === 0){
        dataArr.push({time: 0, channel1: Number(split[1])})
        starttime = time;
        continue;
      }

      if(split[1]){
        dataArr.push({time: time-starttime, channel1: Number(split[1])})
      }
    }
    return dataArr
    // return result
}
</script>


<style scoped lang="scss">
#chart-area {
  border-top: 5px solid;
  border-bottom: 5px solid;
  border-color: black;
  text-align: center;
}

#osc-static-chart{
  width: 95%;
  height: 430px;
  border: solid;
  margin-left: auto;
  margin-right: auto;
  border-color: black;
  margin-top: 10px;
  margin-bottom: 10px;
}

.controller1 > button{
  background-color: orange;
  margin: 5px 5px 5px 5px;
}
.controller1,.controller2{
  margin-top: 10px;
  margin-bottom: 10px;
}
.controller2 > button{
  margin: 5px 5px 5px 5px;
}

.flex-config >.config {
  width: 50vw;
  height: 100%;
  box-sizing: border-box;
}

.flex-config {
  display: flex;
  flex-wrap: wrap;
  // align-items: flex-start;
}
#download-btn {
  margin-bottom: 10px;
}

#csv-btn {
  margin-top: 10px;
}
</style>
