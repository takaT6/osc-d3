import WebSocketWorker from 'worker-loader?inline=fallback!@/work/websocket-worker.ts';
import { Const, PlotDataFormat, ChartDataFormat } from '@/script/common';
import { ref } from 'vue';
import * as d3 from 'd3'
import { RenderUtil } from "@/script/renderUtil";

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
            event.data.plotData[i].markLine = -5
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

  public run = (): void => this.wsPostMessage('run');

  public stop = (): void => this.wsPostMessage('stop');

  public initRenderer = (): void => {
    this.seedData();
    d3.select('#osc-chart').datum(this.dataArr).call(this.chart);
    d3.select(window).on('resize', this.resize);
  }

  public rerender = (): void => {
    this.changeXAxis(5,10);
    d3.select('#osc-chart').datum(this.dataArr).call(this.chart);
  }
}