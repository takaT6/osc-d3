<template>
  <div id="chart-area">
    <div class="controller1">
      <button
        :class="[chartUtil.isConnect.value ? TW.BTN_DISABLED : TW.BTN_ABLED]" 
        :disabled="chartUtil.isConnect.value"
        @click="chartUtil.connect"
      >Connect</button>
      <button
        :class="[(!chartUtil.isConnect.value || chartUtil.isProcess.value) ? TW.BTN_DISABLED : TW.BTN_ABLED]" 
        :disabled="!chartUtil.isConnect.value || chartUtil.isProcess.value"
        @click="chartUtil.disconnect"
      >Disconnect</button>
    </div>
    <div id="osc-chart"></div>
    <div class="controller2">
      <button
        :class="[(!chartUtil.isConnect.value || chartUtil.isProcess.value) ? TW.BTN_DISABLED : TW.BTN_ABLED]" 
        :disabled="!chartUtil.isConnect.value || chartUtil.isProcess.value"
        @click="chartUtil.run"
      >run</button>
      <button
        :class="[(!chartUtil.isConnect.value || !chartUtil.isProcess.value) ? TW.BTN_DISABLED : TW.BTN_ABLED]" 
        :disabled="!chartUtil.isConnect.value || !chartUtil.isProcess.value"
        @click="chartUtil.stop"
      >stop</button>
    </div>
  </div>
  <div id="config-area">
    <div id="accordion-collapse" data-accordion="collapse">
      <h2 id="accordion-collapse-heading-1">
        <button type="button" :class="TW.ACCORDION_HEAD" data-accordion-target="#accordion-collapse-body-1" aria-expanded="false" aria-controls="accordion-collapse-body-1">
          <span>Y Axis Range/ Markline</span>
          <svg data-accordion-icon class="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
      </h2>
      <div id="accordion-collapse-body-1" class="hidden" aria-labelledby="accordion-collapse-heading-1">  
        <div :class="TW.ACCORDION_BODY" class="justify-center">
          <div class="flex justify-center">
            <input :class="TW.INPUT" class="" type="number" v-model="chartUtil.marklineVal.value" style="width: 100px;">
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
    <button
        :class="TW.BTN_ABLED" 
        @click="saveSVGasPNG"
    >download</button>
  </div>
</template>

<script setup lang="ts" >
import { onMounted } from "vue";
import { Const, TW, saveSVGasPNG } from '@/script/common';
import { ChartUtil } from '@/script/chartUtil';

const chartUtil = new ChartUtil();

onMounted(()=> {
  chartUtil.initRenderer();
});

</script>

<style scoped lang="scss">

#osc-chart{
  // padding-left: 10px;
  width: auto;
  height: 430px;
  border: solid;
  border-color: rgb(138, 140, 138)
}

.controller1 > button{
  background-color: orange;
  margin: 5px 5px 5px 5px;
}
.controller1,.controller2{
  border-top: solid;
  border-bottom: solid;
  border-color: rgb(138, 140, 138);
  text-align: center;
}
.controller2 > button{
  margin: 5px 5px 5px 5px;
}
</style>
