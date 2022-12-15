import WebSocketWorker from 'worker-loader?inline=fallback!@/work/websocket-worker.ts';
import { ref } from 'vue';
import * as d3 from 'd3'
import { RenderUtil } from "@/script/renderUtil";
import { PlotDataFormat } from '@/script/common';

export class ChartUtil extends RenderUtil{

  private wsWorker = new WebSocketWorker();
  
  public isConnect = ref(false);

  public isProcess = ref(false);

  constructor(){
    super();
    this.wsWorker.onmessage = (event: MessageEvent): void => {
      switch (event.data.type){
        case 'plotData':
          for(let i=0, len=event.data.plotData.length; i<len; i++){
            event.data.plotData[i].markline = -5
            this.dataArr.push(event.data.plotData[i]);
            this.dataArr.shift();
          }
          // lineArr.push(...event.data.plotData)
            d3.select('#osc-chart').datum(this.dataArr).call(this.chart);
          break;
        case 'isConnect':
          this.isConnect.value = event.data.value;
          break;
        case 'isProcess':
          this.isProcess.value = event.data.value;
          if(event.data.value) requestAnimationFrame(this.newFrame);
          break;
        case 'count':
          console.log(event.data.value);
          break;
      }
    }
  }
  
  public wsPostMessage = (mssg:string): void => { this.wsWorker.postMessage({mssg}); }

  private newFrame = ():void => {
    if(this.isProcess.value){
      this.wsPostMessage('sendData');
      requestAnimationFrame(this.newFrame);
    }
  }

  public connect = (): void => this.wsPostMessage('connect');

  public disconnect = (): void => this.wsPostMessage('disconnect');

  public run = (): void => {this.seedData();this.wsPostMessage('run');}

  public stop = (): void => this.wsPostMessage('stop');
  

  public seedData = (): void => {
    const seedData = new Array<PlotDataFormat>
    for (let i = 0; i < this.DATA_MAX_LENGTH; ++i) {
      if(i>=100000){
        seedData.push({
          time: i,
          channel1: 0
        });
      }else{
        seedData.push({
          time: 0,
          channel1: 0
        });

      }
    }
    this.dataArr = seedData
  }

  public initRenderer = (): void => {
    this.seedData();
    d3.select('#osc-chart').datum(this.dataArr).call(this.chart);
    d3.select(window).on('resize', this.resize);
    this.rerender();
  }

  public rerender = (): void => {
    d3.select('#osc-chart').datum(this.dataArr).call(this.chart);
    requestAnimationFrame(this.rerender);
  }
}