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


  private xData = [...new Array(5000)].map((_, i) => 2);
  private yData = [...new Array(5000)].map((_, i) => i/100);
  private random = d3.randomNormal(0, .2)
  private svg = d3.select("svg");
  private margin = {top: 20, right: 20, bottom: 20, left: 40}
  private width = +400 - this.margin.left - this.margin.right
  private height = +300 - this.margin.top - this.margin.bottom
  private g = this.svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
  // private x = d3.scaleLinear()
  //   // .domain([this.xData[0], this.xData[4999]])
  //   .domain([0, 5000 - 1])
  //   .range([0, this.width]);

  // private y = d3.scaleLinear()
  //   .domain([-1, 1])
  //   .range([this.height, 0]);

  private line = d3.line()
    .x(function(d, i) { return x(i); })
    .y(function(d, i) { return y(d as any); });
  initRenderer = (): void => {
    this.svg = d3.select("svg");
    this.g = this.svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
    this.g.append("defs").append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", this.width)
      .attr("height", this.height);

    this.g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + y(0) + ")")
      .call(d3.axisBottom(x));

    this.g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y));

    this.g.append("g")
      .attr("clip-path", "url(#clip)")
      .append("path")
      .datum(this.xData)
      .attr("class", "line")
      .transition()
      .duration(100)
      .ease(d3.easeLinear)
      .on("start", tick);

    const node = d3.select(".line").node();
    function tick(this: any) {
      // Push a new data point onto the back.
      this.xData.push(this.random());
      
      console.log('hoge')
      // Redraw the line.
      d3.select(node)
          .attr("d", this.line as any)
          .attr("transform", null);
    
      // Slide it to the left.
      d3.active(node)!
        .attr("transform", "translate(" + x(-1) + ",0)")
        .transition()
        .on("start", tick);
    
      // Pop the old data point off the front.
      this.xData.shift();
    }
  }
}


const x = d3.scaleLinear()
  .domain([0, 5000 - 1])
  .range([0, 400]);

const y = d3.scaleLinear()
  .domain([-1, 1])
  .range([300, 0]);