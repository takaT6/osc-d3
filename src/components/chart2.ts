import WebSocketWorker from 'worker-loader?inline=fallback!@/work/websocket-worker.ts';
import { Const } from '@/components/common';
import * as echarts from 'echarts';
import { useChartOptionStore } from "@/store/store";
import { ref } from "vue";
import * as d3 from 'd3'
import * as PIXI from 'pixi.js'
//https://stackblitz.com/edit/typescript-d3-canvas-zoom-pixi?file=index.ts
export class ChartController {

  private wsWorker = new WebSocketWorker();

  constructor(){
    this.wsWorker.onmessage = (event: MessageEvent): void => {
      switch (event.data.type){
        case 'plotData':
          break;
        case 'isConnect':
          this.isConnect.value = event.data.value;
          break;
        case 'isProcess':
          this.isProcess.value = event.data.value;
          break;
        case 'count':
          break;
      }
    }
  }

  public plotData: Float32Array = new Float32Array(
    [...new Array(5000*2)].map((_, i) => {
      if(i%2) return i; //y
      return i/100; //x
    })
  );

  public data = new Float32Array([0,0,1,5,2,2,3,3,4,1,5,1,6,3]);
  
  public isConnect = ref(false);

  public isProcess = ref(false);

  public chartReady = ref(false);

  initData = (): void => {
    console.log('init data')
    this.plotData = new Float32Array([...new Array(5000*2)].map((_, i) => {
      if(i%2) return i; //y
      return i/100; //x
    }));
  }
  
  wsPostMessage = (mssg:string): void => {
    this.wsWorker.postMessage({mssg});
    if(mssg == 'connect'){
      this.wsWorker.postMessage({mssg:'ready', plotData: this.plotData}, [this.plotData.buffer]);
    }
  }

  newFrame = () => {
    if(this.isProcess.value){
      this.wsPostMessage('sendData');
      requestAnimationFrame(this.newFrame);
    }
  }

  connect = (): void => {
    this.wsWorker.postMessage({mssg:'connect'});
  }

  disconnect = (): void => this.wsWorker.postMessage({mssg:'disconnect'});

  run = (): void => {
    this.wsWorker.postMessage({mssg:'run'});
    // this.newFrame()
  }

  stop = (): void => this.wsWorker.postMessage({mssg:'stop'});

  private margin = {top: 20, right: 20, bottom: 30, left: 50};
  private width = 400 - this.margin.left - this.margin.right;
  private height = 500 - this.margin.top - this.margin.bottom;
  // private parseTime = d3.timeParse("%Y-%m-%d");
  public x = d3.scaleLinear().range([0, this.width]);
  public y = d3.scaleLinear().range([this.height, 0]);
  private valueline = d3.line()
    .x(function(d: any) { return x(d.date); })
    .y(function(d: any) { return y(d.value); });
  private svg = d3.select("#my_dataviz").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  initD3Chart = (): void => {
    this.svg = d3.select("#my_dataviz").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv").then((data) => {
      console.log(data)
        // format the data
      let count = 0.001;
      data.forEach(function(d: any) {
          d.date = count+=0.001;
          d.value = +d.value;
      });

      // Scale the range of the data
      x.domain(d3.extent(data, (d: any) => { return d.date; }) as any);
      y.domain([0, d3.max(data, (d: any) => { return d.value; })]);

      // Add the valueline path.
      this.svg.append("path")
          .data([data])
          .attr("class", "line")
          .attr("d", this.valueline as any);
      
      // Add the x Axis
      this.svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      // Add the y Axis
      this.svg.append("g")
          .call(d3.axisLeft(y));
    })
    // let newY =
    // for(let i=0,len=this.data.length; i<len; i+=2){
      
    // }
  }


  initRenderer = (): void => {
    //hoge
  }
}


const margin = {top: 20, right: 20, bottom: 30, left: 50};
const width = 400 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;
const x = d3.scaleLinear().range([0, width]);
const y = d3.scaleLinear().range([height, 0]);


// const margin = { top: 20, right: 15, bottom: 60, left: 70 };
// const outerWidth = 500;
// const outerHeight = 500;
// const width = outerWidth - margin.left - margin.right;
// const height = outerHeight - margin.top - margin.bottom;
// const dataExample = [];
// const waferSizeMM = 300;
// const waferRadiusMM = waferSizeMM/2;
// const wferRadiusInnerMM = waferRadiusMM - 3;
// const x = d3.scaleLinear().domain([-waferRadiusMM,waferRadiusMM]).range([0, width]);
// const y = d3.scaleLinear().domain([-waferRadiusMM, waferRadiusMM]).range([height, 0]);
// const cxWaferCircle = x(0);
// const cyWaferCircle = y(0);
// const rxWaferCircle = cxWaferCircle-x(-waferRadiusMM);
// const ryWaferCircle = y(-waferRadiusMM)-cyWaferCircle;
// const xAxis = d3.axisBottom(x);
// const yAxis = d3.axisLeft(y);