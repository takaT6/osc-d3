<template>
  <div id="my_dataviz"></div>
  <div class="controller">
    <button
      :class="[chartController.isConnect.value ? Const.BTN_DISABLED : Const.BTN_ABLED]" 
      id="connect"
      @click="chartController.connect"
    >
      Connect
    </button>
    <button
      :class="[(!chartController.isConnect.value || chartController.isProcess.value) ? Const.BTN_DISABLED : Const.BTN_ABLED]" 
      id="disconnect"
      @click="chartController.disconnect"
    >
      Disconnect
    </button>
  </div>
  <br>
  <div class="controller">
    <button
      :class="[(!chartController.isConnect.value || chartController.isProcess.value) ? Const.BTN_DISABLED : Const.BTN_ABLED]" 
      id="run"
      @click="chartController.run"
    >
      run
    </button>
    <button
    :class="[(!chartController.isConnect.value || !chartController.isProcess.value) ? Const.BTN_DISABLED : Const.BTN_ABLED]" 
      id="stop"
      @click="chartController.stop"
    >
      stop
    </button>
  </div>
  <br>

  <div id="my_pixi"></div>
  <div id="my_pixi2"></div>
  <svg width="400" height="300"></svg>
</template>

<script setup lang="ts" >
import { onMounted, watch, toRefs, reactive } from "vue";
// import { useChartStore } from "@/store/store";
import { storeToRefs } from 'pinia';
import { Const } from '@/components/common';
import { ChartController } from '@/components/chart2';
import * as d3 from 'd3'
import * as PIXI from 'pixi.js'

const chartController = new ChartController();

onMounted(()=> {
  // chartController.initD3Chart();
  // const dataExample = [];
  // const waferSizeMM = 300;
  // const waferRadiusMM = waferSizeMM/2;
  // const wferRadiusInnerMM = waferRadiusMM - 3;

  // const pointCount = 100000;
  // for (let i = 0; i < pointCount; i++) {
  //   const x = (waferSizeMM/2) - (Math.floor(Math.random() * (waferSizeMM-1)) + 1);
  //   const y = (waferSizeMM/2) - (Math.floor(Math.random() * (waferSizeMM-1)) + 1);
  //   if (x*x + y*y < wferRadiusInnerMM*wferRadiusInnerMM)
  //     dataExample.push([x, y]);
  // }
  // const pointColor = '#3585ff'

  // const margin = { top: 20, right: 15, bottom: 60, left: 70 };
  // const outerWidth = 500;
  // const outerHeight = 500;
  // const width = outerWidth - margin.left - margin.right;
  // const height = outerHeight - margin.top - margin.bottom;

  // const container = d3.select('#my_pixi');

  // const lastTransform = d3.zoomIdentity.translate(margin.left, margin.top).scale(1);
  // // Init SVG
  // const svgChart = container.append('svg:svg')
  //     .attr('width', outerWidth)
  //     .attr('height', outerHeight)
  //     .attr('class', 'svg-plot')
  //     .append('g')
  //     .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // const canvasChart = container.append('canvas')
  //     .attr('width', outerWidth)
  //     .attr('height', outerHeight)
  //     .style('border','solid 2px red')
  //     .attr('class', 'canvas-plot');

  // const app = new PIXI.Application({
  //     view: canvasChart.node()!,
  //     // transparent: true,
  // });


  // const context = canvasChart.node()?.getContext('2d');

  // // Init Scales
  // const x = d3.scaleLinear().domain([
  //   -waferRadiusMM,//d3.min(dataExample, (d) => d[0]), 
  //   waferRadiusMM//d3.max(dataExample, (d) => d[0])
  //   ])
  //   .range([0, width])
  //   //.nice()
  //   ;
  // const y = d3.scaleLinear().domain([
  //   -waferRadiusMM,//d3.min(dataExample, (d) => d[1]), 
  //   waferRadiusMM//d3.max(dataExample, (d) => d[1])
  //   ])
  //   .range([height, 0])
  //   //.nice()
  //   ;

  // // Init Axis
  // const xAxis = d3.axisBottom(x);
  // const yAxis = d3.axisLeft(y);

  // //wafer circle
  // const cxWaferCircle = x(0);
  // const cyWaferCircle = y(0);
  // const rxWaferCircle = cxWaferCircle-x(-waferRadiusMM);
  // const ryWaferCircle = y(-waferRadiusMM)-cyWaferCircle;

  // const waferCircle=svgChart.append('circle')
  //   .attr('cx', ''+cxWaferCircle)
  //   .attr('cy', ''+cyWaferCircle)
  //   .attr('r', ''+rxWaferCircle)
  //   .attr('fill', '#cfcfcf')
  //   .attr('stroke', 'black')
  //   ;

  // // Add Axis
  // const gxAxis = svgChart.append('g')
  //     .attr('transform', `translate(0, ${height})`)
  //     .call(xAxis);

  // const gyAxis = svgChart.append('g')
  //     .call(yAxis);

  // // Add labels
  // svgChart.append('text')
  //     .attr('x', `-${height / 2}`)
  //     .attr('dy', '-3.5em')
  //     .attr('transform', 'rotate(-90)')
  //     .text('Axis Y');
  // svgChart.append('text')
  //     .attr('x', `${width / 2}`)
  //     .attr('y', `${height + 40}`)
  //     .text('Axis X');

  // app.stage.position.set(margin.left, margin.top);

  // const graphics = new PIXI.Graphics();
  // graphics.beginFill(0xFF700B, 0);
  // graphics.lineStyle(2, 0x222222, 1);

  // const cx0 = x(0);
  // const cy0 = y(0);
  // const r = x(waferRadiusMM) - cx0;
  // graphics.drawCircle(cx0, cy0, r);

  // //graphics.drawRect(0, 0, app.screen.width, app.screen.height);

  // const waferContainer = new PIXI.Container();

  // app.stage.addChild(waferContainer);

  // waferContainer.addChild(graphics);
  // waferContainer.x = margin.left;
  // waferContainer.y = margin.top;


  // dataExample.forEach(point => {
  //     //drawPoint(scaleX, scaleY, point, transform.k);

  //     const gfxPoint = new PIXI.Graphics();
  //     gfxPoint.beginFill(0xFF700B, 1);
  //     gfxPoint.lineStyle(0, 0x00FF00, 1);

  //     const cx0 = x(point[0]);
  //     const cy0 = y(point[1]);
  //     const r = 1;
  //     gfxPoint.drawCircle(cx0, cy0, r);
  //     waferContainer.addChild(gfxPoint);
  // });


  // const width = window.innerWidth;
  // const height = window.innerHeight;
  // const renderer = PIXI.autoDetectRenderer({ autoDensity: true, antialias: true, width, height, backgroundColor: 0x000000, resolution: window.devicePixelRatio || 1 });
  // document.body.appendChild(renderer.view as any);
  // const stage = new PIXI.Container();
  // const container = new PIXI.Container();
  // stage.addChild(container);

  // const linksGfx = new PIXI.Graphics();
  // linksGfx.alpha = 0.6;
  // container.addChild(linksGfx);


  const n = 5000
  const random = d3.randomNormal(0, .2)
  const data = d3.range(n).map(random);

  const svg = d3.select("svg")
  const margin = {top: 20, right: 20, bottom: 20, left: 40}
  const width = +svg.attr("width") - margin.left - margin.right
  const height = +svg.attr("height") - margin.top - margin.bottom
  const g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const x = d3.scaleLinear()
    .domain([0, n - 1])
    .range([0, width]);

  const y = d3.scaleLinear()
    .domain([-1, 1])
    .range([height, 0]);

  const line = d3.line()
    .x(function(d, i) { return x(i); })
    .y(function(d, i) { return y(d as any); });

  g.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);

  g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + y(0) + ")")
    .call(d3.axisBottom(x));

  g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y));

  g.append("g")
    .attr("clip-path", "url(#clip)")
    .append("path")
    .datum(data)
    .attr("class", "line")
    .transition()
    .duration(100)
    .ease(d3.easeLinear)
    .on("start", tick);

const node = d3.select(".line").node();
// tick
// function tick(this: any) {
function tick(this: any) {
  // Push a new data point onto the back.
  data.push(random());
  
console.log()
  // Redraw the line.
  d3.select(node)
      .attr("d", line as any)
      .attr("transform", null);

  // Slide it to the left.
  d3.active(node)!
    .attr("transform", "translate(" + x(-1) + ",0)")
    .transition()
    // .on("start", tick);

  // Pop the old data point off the front.
  data.shift();
  // console.log(d3.select(".line").node())
  // console.log(svg.nodes())
}
});
</script>

<style scoped lang="scss">
#graph {
  width: auto;
  height: 40vh;
}

svg{
  // background-color: black;
}
</style>
