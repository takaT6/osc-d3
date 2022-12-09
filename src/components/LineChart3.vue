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
  <div id="chart"></div>
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
  // chartController.initRenderer();
//   const n = 5000
//   const random = d3.randomNormal(0, .2)
//   let xRandom = 5000;
//   const data = [...new Array(5000)].map((_, i) => i);
//   // const data = [...new Array(5000)].map((_, i) => retrun{date:i, value:i});
//   const xData = [...new Array(5000)].map((_, i) => i);
//   const svg = d3.select("svg")
//   const margin = {top: 20, right: 20, bottom: 20, left: 40}
//   const width = +svg.attr("width") - margin.left - margin.right
//   const height = +svg.attr("height") - margin.top - margin.bottom
//   const g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")")
//   .attr("fill", "none")
//   .attr("stroke", "green");
//   const x = d3.scaleLinear()
//     .domain([xData[0], xData[4999]])
//     .range([0, width]);

//   const y = d3.scaleLinear()
//     .domain([-1, 1])
//     .range([height, 0]);

//   const line = d3.line()
//     .x(function(d, i) { return x(i); })
//     .y(function(d, i) { return y(d as any); });

//   g.append("defs").append("clipPath")
//     .attr("id", "clip")
//     .append("rect")
//     .attr("width", width)
//     .attr("height", height);

//   g.append("g")
//     .attr("class", "axis axis--x")
//     .attr("transform", "translate(0," + y(0) + ")")
//     .call(d3.axisBottom(x).ticks(5));

//   g.append("g")
//     .attr("class", "axis axis--y")
//     .call(d3.axisLeft(y));

//   g.append("g")
//     .attr("clip-path", "url(#clip)")
//     .append("path")
//     .datum(data)
//     .attr("class", "line")
//     .transition()
//     .duration(10)
//     .ease(d3.easeLinear)
//     .on("start", tick);

// const node = d3.select(".line").node();
// // tick
// // function tick(this: any) {
// function tick(this: any) {
//   xRandom++;
//   // Push a new data point onto the back.
//   xData.push(xRandom)
//   data.push(random());
  
//   // Redraw the line.
//   d3.select(node)
//       .attr("d", line as any)
//       .attr("transform", null);

//   // Slide it to the left.
//   d3.active(node)!
//     .attr("transform", "translate(" + x(-1) + ",0)")
//     .transition()
//     .on("start", tick);

//     // x.domain(d3.extent(xData, function(d) { return d; }) as any);
//     // y.domain([0, d3.max(data, function(d) { return d; })] as any);
//   // Pop the old data point off the front.
//   data.shift();
//   xData.shift()
// }
function realTimeLineChart() {
  let margin = {top: 20, right: 20, bottom: 20, left: 20},
      width = 600,
      height = 400,
      duration = 500,
      color = d3.schemeCategory10;

  function chart(selection:any) {
    // Based on https://bl.ocks.org/mbostock/3884955
    selection.each(function(data:any) {
      data = ["x", "y", "z"].map(function(c) {
        return {
          label: c,
          values: data.map(function(d:any) {
            return {time: +d.time, value: d[c]};
          })
        };
      });

      const t = d3.transition().duration(duration).ease(d3.easeLinear),
          x = d3.scaleTime().rangeRound([0, width-margin.left-margin.right]),
          y = d3.scaleLinear().rangeRound([height-margin.top-margin.bottom, 0]),
          z = d3.scaleOrdinal(color);

      const xMin = d3.min(data, function(c:any) { return d3.min(c.values, function(d) { return d.time; })});
      const xMax = new Date(new Date(d3.max(data, function(c:any) {
        return d3.max(c.values, function(d:any) { return d.time; })
      })as any).getTime() - (duration*2));

      x.domain([xMin, xMax] as any);
      y.domain([
        d3.min(data, function(c:any) { return d3.min(c.values, function(d:any) { return d.value; })}),
        d3.max(data, function(c:any) { return d3.max(c.values, function(d:any) { return d.value; })})
      ] as any);
      z.domain(data.map(function(c:any) { return c.label; }));

      const line = d3.line()
        .curve(d3.curveBasis)
        .x(function(d:any) { return x(d.time); })
        .y(function(d:any) { return y(d.value); });

      let svg = d3.select(this as any).selectAll("svg").data([data]);
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
      legendEnter.append("rect")
        .attr("width", 50)
        .attr("height", 75)
        .attr("fill", "#ffffff")
        .attr("fill-opacity", 0.7);
      legendEnter.selectAll("text")
        .data(data).enter()
        .append("text")
          .attr("y", function(d, i) { return (i*20) + 25; })
          .attr("x", 5)
          .attr("fill", function(d) { return z(d.label); });

      svg = selection.select("svg");
      svg.attr('width', width).attr('height', height);
      const g = svg.select("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      g.select("g.axis.x")
        .attr("transform", "translate(0," + (height-margin.bottom-margin.top) + ")")
        .transition(t)
        .call(d3.axisBottom(x).ticks(5) as any);
      g.select("g.axis.y")
        .transition(t)
        .attr("class", "axis y")
        .call(d3.axisLeft(y)as any);

      g.select("defs clipPath rect")
        .transition(t)
        .attr("width", width-margin.left-margin.right)
        .attr("height", height-margin.top-margin.right);

      g.selectAll("g path.data")
        .data(data)
        .style("stroke", function(d: any) { return z(d.label); })
        .style("stroke-width", 1)
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

      // For transitions https://bl.ocks.org/mbostock/1642874
      function tick() {
        d3.select(this)
          .attr("d", function(d:any) { return line(d.values); })
          .attr("transform", null);

        const xMinLess = new Date(new Date(xMin as any).getTime() - duration);
        d3.active(this)!
            .attr("transform", "translate(" + x(xMinLess) + ",0)")
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

const lineArr = [] as any;
    const MAX_LENGTH = 100;
    const duration = 500;
    const chart = realTimeLineChart();

    function randomNumberBounds(min:any, max:any) {
      return Math.floor(Math.random() * max) + min;
    }

    function seedData() {
      const now = new Date();
      for (let i = 0; i < MAX_LENGTH; ++i) {
        lineArr.push({
          time: new Date(now.getTime() - ((MAX_LENGTH - i) * duration)),
          x: randomNumberBounds(0, 5),
          y: randomNumberBounds(0, 2.5),
          z: randomNumberBounds(0, 10)
        });
      }
    }

    function updateData() {
      const now = new Date();

      const lineData = {
        time: now,
        x: randomNumberBounds(0, 5),
        y: randomNumberBounds(0, 2.5),
        z: randomNumberBounds(0, 10)
      };
      lineArr.push(lineData);

      if (lineArr.length > 30) {
        lineArr.shift();
      }
      d3.select("#chart").datum(lineArr).call(chart);
    }

    function resize() {
      if (d3.select("#chart svg").empty()) {
        return;
      }
      chart.width(+d3.select("#chart").style("width").replace(/(px)/g, ""));
      d3.select("#chart").call(chart);
    }

    document.addEventListener("DOMContentLoaded", function() {
      seedData();
      window.setInterval(updateData, 50);
      d3.select("#chart").datum(lineArr).call(chart);
      d3.select(window).on('resize', resize);
    });
});
</script>

<style scoped lang="scss">
#graph {
  width: auto;
  height: 40vh;
}

svg{
  background-color: black;
}
</style>
