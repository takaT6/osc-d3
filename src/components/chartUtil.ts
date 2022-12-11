import WebSocketWorker from 'worker-loader?inline=fallback!@/work/websocket-worker.ts';
import { Const, PlotDataFormat, ChartDataFormat } from '@/components/common';
import { ref } from "vue";
import * as d3 from 'd3'
import * as PIXI from 'pixi.js'
//https://stackblitz.com/edit/typescript-d3-canvas-zoom-pixi?file=index.ts
export class ChartUtil {

  private wsWorker = new WebSocketWorker();
  
  public isConnect = ref(false);

  public isProcess = ref(false);

  public chartReady = ref(false);

  constructor(){
    this.wsWorker.onmessage = (event: MessageEvent): void => {
      switch (event.data.type){
        case 'plotData':
          for(let i=0, len=event.data.plotData.length; i<len; i++){
            lineArr.push(event.data.plotData[i]);
            lineArr.shift();
          }
          // lineArr.push(...event.data.plotData)
            d3.select("#osc-chart").datum(lineArr).call(chart);
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

  public changeAxis = ():void => {
    axisXmax = randomNumberBounds(0,3);
    if(axisXmax < 0){ axisXmin = axisXmax-4
    }else{axisXmin = axisXmax-4}
    d3.select("#osc-chart").datum(lineArr).call(chart);
  }
}

class RenderUtil {
 static realTimeLineChart = () => {
  let margin = {top: 20, right: 20, bottom: 25, left: 50};
  let width = document.body.clientWidth;
  let height = 420;
  let duration = 500;
  let color = ["#008000"];

  const chart = (selection:any) => {
    selection.each((data:any) => {
      // data = ["x", "y", "z"].map(function(c) {
      data = ["value1"].map((c) => {
        return {
          label: c,
          values: data.map((d:any) => { return {time: +d.time, value: d[c]}; })
        };
      });

      const xMin = d3.min(data, (c:ChartDataFormat) => { return d3.min(c.values, (d:PlotDataFormat) => { return d.time; })});
      const xMax = d3.max(data, (c:ChartDataFormat) => { return d3.max(c.values, (d:PlotDataFormat) => { return d.time; })});

      const x = d3.scaleLinear().rangeRound([0, width-margin.left-margin.right-10]);
      const y = d3.scaleLinear().rangeRound([height-margin.top-margin.bottom, 0]);
      const z = d3.scaleOrdinal(color);
      x.domain([xMin, xMax] as [number,number]);
      y.domain([axisXmin, axisXmax]);
      z.domain(data.map((c:ChartDataFormat):string => { return c.label; }));

      const line = d3.line()
        .x((d:any) => { return x(d.time); })
        .y((d:any) => { return y(d.value); });

      const chartNode = d3.select("#osc-chart").node();
      let svg = d3.select(chartNode).selectAll("svg").data([data]);
      const gEnter = svg.enter().append("svg").append("g");
      gEnter.append("g").attr("class", "axis x");
      gEnter.append("g").attr("class", "axis y");
      gEnter.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width-margin.left-margin.right)
        .attr("height", height-margin.top-margin.bottom);
      gEnter.append("g")
        .attr("class", "lines")
        .attr("clip-path", "url(#clip)")
        .selectAll(".data").data(data).enter()
        .append("path")
        .attr("class", "data");

      const legendEnter = gEnter.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(" + (width-margin.right-margin.left-75) + ",25)");
      // legendEnter.append("rect")
      //   .attr("width", 50)
      //   .attr("height", 75)
      //   .attr("fill", "#ffffff")
      //   .attr("fill-opacity", 0.7);
      legendEnter.selectAll("text")
        .data(data).enter()
        .append("text")
          .attr("y", function(d, i) { return (i*20) + 25; })
          .attr("x", 5)
          .attr("fill", function(d:any) { return z(d.label); });

      svg = selection.select("svg");
      svg.attr('width', width).attr('height', height);
      const g = svg.select("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      const axisX = g.select("g.axis.x")
        .attr("transform", "translate(0," + (height-margin.bottom-margin.top) + ")")
        .call(d3.axisBottom(x).ticks(5) as any);
        
      axisX.select("path")
        .attr("stroke",color[0])
        .attr("stroke-width","3");

      axisX.selectAll('.tick')
        .attr("font-size","17")
        .attr("color", color[0]);

      const axisY = g.select("g.axis.y")
        .attr("class", "axis y")
        .call(d3.axisLeft(y)as any);

      axisY.select("path")
        .attr("stroke",color[0])
        .attr("stroke-width","3")

      axisY.selectAll('.tick')
        .attr("font-size","17")
        .attr("color", color[0]);

      g.selectAll("g path.data")
        .data(data)
        .style("stroke", (d: any) => { return z(d.label); })
        .style("stroke-width", 0.5)
        .style("fill", "none")
        .transition()
        .duration(duration)
        .ease(d3.easeLinear)
        .on("start", tick);

      g.selectAll("g .legend text")
        .data(data)
        .text(function(d: any) {
          return d.label.toUpperCase() + ": " + d.values[d.values.length-1].value;
        });
    
      function tick(this: any) {
        d3.select(this)
          .attr("d", function(d:any) { return line(d.values); })
          .attr("transform", null);
          
        d3.active(this)!
          .attr("transform", "translate(" + x(Number(xMin)) + ",0)")
          .transition()
          .on("start", tick);
      }
    });
  }

  chart.margin = function(_:any) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function(_:any) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_:any) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_:any) {
    if (!arguments.length) return color;
    color = _;
    return chart;
  };

  chart.duration = function(_:any) {
    if (!arguments.length) return duration;
    duration = _;
    return chart;
  };

  return chart;
}
}

const lineArr = [] as any;
const MAX_LENGTH = 10000;
const chart = RenderUtil.realTimeLineChart()
let axisXmin = -10
let axisXmax = 10

const randomNumberBounds = (min:number, max:number): number => {
  return Math.floor(Math.random() * max) + min;
}

let count = 0.00;

const seedData = (): void => {
  // const now = new Date();
  for (let i = 0; i < MAX_LENGTH; ++i) {
    const now = count+=0.01;
    lineArr.push({
      time: now,
      value1: randomNumberBounds(0, 5),
      // y: randomNumberBounds(0, 2.5),
      // z: randomNumberBounds(0, 10)
    });
  }
}

const updateData = (): void => {
  // const now = new Date();
  const now = count+=0.01;

  const lineData = {
    time: now,
    value: randomNumberBounds(0, 5),
    // y: randomNumberBounds(0, 2.5),
    // z: randomNumberBounds(0, 10)
  };
  if(now >= MAX_LENGTH/100-1 && MAX_LENGTH/100-1 > now){
      const lineData = {
      time: now,
      value: 10,
      // y: 3,
      // z: 4
    };
    lineArr.push(lineData);
  }else if(now >= MAX_LENGTH/100-1){
      const lineData = {
      time: now,
      value: -10,
      // y: 10,
      // z: 7
    };
    lineArr.push(lineData);
  }else{
  lineArr.push(lineData);
  }

  if (lineArr.length > MAX_LENGTH) {
    lineArr.shift();
  }
  d3.select("#osc-chart").datum(lineArr).call(chart);
}

const resize = () => {
  if (d3.select("#osc-chart svg").empty()) return;
  chart.width(+d3.select("#osc-chart").style("width").replace(/(px)/g, ""));
  d3.select("#osc-chart").call(chart);
}

const resizeData = () => {
  if (lineArr.length > MAX_LENGTH) {
    lineArr.shift();
    if(lineArr.length > MAX_LENGTH) {
      resizeData()
    }
  }
}

export const activateChart = () =>{
  seedData();
  // window.setInterval(updateData, 100);
  // window.setInterval(resizeData, 10);
  d3.select("#osc-chart").datum(lineArr).call(chart);
  d3.select(window).on('resize', resize);
}