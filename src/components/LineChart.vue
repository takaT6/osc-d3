<template>
  <div id="osc-chart"></div>
  <br>
  <div class="controller">
    <button
      :class="[chartUtil.isConnect.value ? Const.BTN_DISABLED : Const.BTN_ABLED]" 
      id="connect"
      @click="chartUtil.connect"
    >
      Connect
    </button>
    <button
      :class="[(!chartUtil.isConnect.value || chartUtil.isProcess.value) ? Const.BTN_DISABLED : Const.BTN_ABLED]" 
      id="disconnect"
      @click="chartUtil.disconnect"
    >
      Disconnect
    </button>
  </div>
  <br>
  <div class="controller">
    <button
      :class="[(!chartUtil.isConnect.value || chartUtil.isProcess.value) ? Const.BTN_DISABLED : Const.BTN_ABLED]" 
      id="run"
      @click="chartUtil.run"
    >
      run
    </button>
    <button
    :class="[(!chartUtil.isConnect.value || !chartUtil.isProcess.value) ? Const.BTN_DISABLED : Const.BTN_ABLED]" 
      id="stop"
      @click="chartUtil.stop"
    >
      stop
    </button>
  </div>

  <button
      @click="chartUtil.rerender"
    > change axis
  </button>
  <br>
</template>

<script setup lang="ts" >
import { onMounted, watch, toRefs, reactive } from "vue";
import { Const } from '@/script/common';
import { ChartUtil } from '@/script/chartUtil';

const chartUtil = new ChartUtil();

onMounted(()=> {
  chartUtil.initRenderer();
});

</script>

<style scoped lang="scss">
#graph {
  width: auto;
  height: 40vh;
}

#osc-chart{
  background-color: black;
  width: auto;
  height: 430px;
  
}
</style>
