import * as d3 from 'd3'
import { WebSocketUtil } from "@/script/webSocketUtil";

export class ChartUtil extends WebSocketUtil{
  constructor() {
    super();
    this.wsWorker.onmessage = (event: MessageEvent): void => {
      switch (event.data.type){
        case 'plotData':
          for(let i=0, len=event.data.plotData.length; i<len; i++){
            this.dataArr.push(event.data.plotData[i]);
            this.dataArr.shift();
            this.upTriger.judgge(event.data.plotData[i].channel1);
          }
          d3.select('#osc-chart').datum(this.dataArr).call(this.chart);
          break;
        case 'isConnect':
          this.isConnect.value = event.data.value;
          break;
        case 'isProcess':
          this.isProcess.value = event.data.value;
          this.upTriger.set(this.marklineVal.value)
          if (event.data.value) requestAnimationFrame(this.newFrame);
          break;
        case 'count':
          console.log(event.data.value);
          break;
      }
    }
  }

  public run = (): void => { 
    this.seedData();
    super.run();
  }
  
  private seedDataSet = [...Array(this.DATA_MAX_LENGTH)].map(i => { return {time: 0, channel1: 0}});
  public seedData = (): void => {
    console.log(this.dataArr.length)
    // const seedData = new Array<PlotDataFormat>
    // for (let i=0; i < this.DATA_MAX_LENGTH; ++i) {
    //   if (i>=100000){
    //     seedData.push({
    //       time: i,
    //       channel1: 0
    //     });
    //   }else{
    //     seedData.push({
    //       time: 0,
    //       channel1: 0
    //     });
    //   }
    // }
    // this.dataArr = seedData
    this.dataArr = [];
    this.dataArr = this.seedDataSet;
  }

  public initRenderer = (): void => {
    this.seedData();
    d3.select('#osc-chart').datum(this.dataArr).call(this.chart);
    d3.select(window).on('resize', this.resize);
    this.rerender();
  }

  public rerender = (): void => {
    if (!this.isProcess.value) d3.select('#osc-chart').datum(this.dataArr).call(this.chart);
    requestAnimationFrame(this.rerender);
  }

  public upTriger = (() => {
    let v = 0;
    let pre_v = 0;
    const set = (val: number) => {
      pre_v = 1000000;
      v = val;
    }
    let isSendStop = false;
    const judgge = (val:number) => {
      if (!isSendStop && pre_v < val && v < val ){
        this.stop();
        isSendStop = true;
      }
      pre_v = val;
    }
    return { set, judgge };
  })();
}