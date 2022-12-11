
import * as d3 from 'd3'
import { PlotDataFormat, ChartDataFormat } from '@/components/common';
import { ChartOtpionUtil } from './chartOptionUtil';

export class RenderUtil extends ChartOtpionUtil{
  private realTimeLineChart = () => {
    const chart = (selection:any) => {
      selection.each((data:any) => {
        // data = ['x', 'y', 'z'].map(function(c) {
        data = ['value1', 'markLine'].map((c) => {
          return {
            label: c,
            values: data.map((d:any) => { return {time: +d.time, value: d[c]}; })
          };
        });

        const xMin = d3.min(data, (c:ChartDataFormat) => { return d3.min(c.values, (d:PlotDataFormat) => { return d.time; })});
        const xMax = d3.max(data, (c:ChartDataFormat) => { return d3.max(c.values, (d:PlotDataFormat) => { return d.time; })});

        const x = d3.scaleLinear().rangeRound([0, this.width-this.margin.left-this.margin.right-10]);
        const y = d3.scaleLinear().rangeRound([this.height-this.margin.top-this.margin.bottom, 0]);
        const z = d3.scaleOrdinal(this.color);

        x.domain([xMin, xMax] as [number,number]);
        y.domain([this.yAxisMin, this.yAxisMax]);
        z.domain(data.map((c:ChartDataFormat):string => { return c.label; }));

        const line = d3.line()
          .x((d:any) => { return x(d.time); })
          .y((d:any) => { return y(d.value); });

        const chartNode = d3.select('#osc-chart').node();
        let svg = d3.select(chartNode).selectAll('svg').data([data]);
        const gEnter = svg.enter().append('svg').append('g');
        gEnter.append('g').attr('class', 'axis x');
        gEnter.append('g').attr('class', 'axis y');
        gEnter.append('defs').append('clipPath')
          .attr('id', 'clip')
          .append('rect')
          .attr('width', this.width-this.margin.left-this.margin.right)
          .attr('height', this.height-this.margin.top-this.margin.bottom);
        gEnter.append('g')
          .attr('class', 'lines')
          .attr('clip-path', 'url(#clip)')
          .selectAll('.data').data(data).enter()
          .append('path')
          .attr('class', 'data');

        const legendEnter = gEnter.append('g')
          .attr('class', 'legend')
          .attr('transform', 'translate(' + (this.width-this.margin.right-this.margin.left-75) + ',25)');
        
        legendEnter.selectAll('text')
          .data(data).enter()
          .append('text')
          .attr('y', (d, i) => { return (i*20) + 25; })
          .attr('x', -200)
          .attr('fill',(d:any) => { return z(d.label); });

        svg = selection.select('svg');
        svg.attr('width', this.width).attr('height', this.height);

        const g = svg.select('g')
          .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

        const axisX = g.select('g.axis.x')
          .attr('transform', 'translate(0,' + (this.height-this.margin.bottom-this.margin.top) + ')')
          .call(d3.axisBottom(x).ticks(5) as any);
          
        axisX.select('path')
          .attr('stroke', this.color[0])
          .attr('stroke-width','3');

        axisX.selectAll('.tick')
          .attr('font-size','17')
          .attr('color', this.color[0]);

        const axisY = g.select('g.axis.y')
          .attr('class', 'axis y')
          .call(d3.axisLeft(y)as any);

        axisY.select('path')
          .attr('stroke', this.color[0])
          .attr('stroke-width','3')

        axisY.selectAll('.tick')
          .attr('font-size','17')
          .attr('color', this.color[0]);

        g.selectAll('g path.data')
          .data(data)
          .style('stroke', (d: any) => { return z(d.label); })
          .style('stroke-width', 0.5)
          .style('fill', 'none')
          .transition()
          .duration(this.duration)
          .ease(d3.easeLinear)
          .on('start', tick);

        g.selectAll('g .legend text')
          .data(data)
          .text((d: any) => { return d.label.toUpperCase() + ': ' + d.values[d.values.length-1].value; });
      
        function tick(this: any) {
          d3.select(this)
            .attr('d', (d:any) => { return line(d.values); })
            .attr('transform', null);
            
          d3.active(this)!
            .attr('transform', 'translate(' + x(Number(xMin)) + ',0)')
            .transition()
            .on('start', tick);
        }
      });
    }

    chart.margin = function(_:any) {
      if (!arguments.length) return this.margin;
      this.margin = _;
      return chart;
    };

    chart.width = function(_:any) {
      if (!arguments.length) return this.width;
      this.width = _;
      return chart;
    };

    chart.height = function(_:any) {
      if (!arguments.length) return this.height;
      this.height = _;
      return chart;
    };

    chart.color = function(_:any) {
      if (!arguments.length) return this.color;
      this.color = _;
      return chart;
    };

    chart.duration = function(_:any) {
      if (!arguments.length) return this.duration;
      this.duration = _;
      return chart;
    };

    return chart;
  }

  public resize = () => {
    if (d3.select('#osc-chart svg').empty()) return;
    this.chart.width(+d3.select('#osc-chart').style('width').replace(/(px)/g, ''));
    d3.select('#osc-chart').call(this.chart);
  }
  
  private resizeData = () => {
    if (this.dataArr.length > this.DATA_MAX_LENGTH) {
      this.dataArr.shift();
      if(this.dataArr.length > this.DATA_MAX_LENGTH) {
        this.resizeData()
      }
    }
  }

  public chart = this.realTimeLineChart();
}