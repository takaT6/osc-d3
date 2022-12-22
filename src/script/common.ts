export const Const = {
  WS_ADDRESS: 'ws://localhost:8088/echo',
  // WS_ADDRESS: "ws://192.168.11.2:8088/echo",
  GRAPH_ID: 'osc-chart',
}

export const TW ={
  BTN_ABLED: 'rounded-full bg-sky-500 px-4 py-2 hover:bg-sky-700',
  BTN_DISABLED: 'rounded-full bg-sky-500 px-4 py-2 hover:bg-sky-700 opacity-50 cursor-not-allowed',
  LABEL: 'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-black dark:text-white',
  INPUT: 'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 my-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500',
  RANGE: 'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700',
  ACCORDION_HEAD: 'flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900',
  ACCORDION_BODY: 'p-5 font-light border border-t-0 border-gray-200 dark:border-gray-700',
  
}

export interface PlotDataFormat {
  time: number,
  channel1: number
}

export interface ChartDataFormat{
  label: string,
  channels: Array<PlotDataFormat>,
}


import * as d3 from 'd3'
export const saveSVGasPNG = () => {
  const d3svg = document.querySelector(`#${Const.GRAPH_ID} > svg` ) as SVGSVGElement;
  const svgData = new XMLSerializer().serializeToString(d3svg);
  const canvas = document.createElement("canvas");
  canvas.width = d3svg.width.baseVal.value;
  canvas.height = d3svg.height.baseVal.value;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const image = new Image();
  image.src = "data:image/svg+xml;charset=utf-8;base64," + btoa(svgData);

  image.onload = () => {
    ctx.drawImage(image, 0, 0)
    // ダウンロードリンクを動的に追加（ここでのポイントはcanvas.toDataURLであり、d3.jsを使わなくても良いが、せっかくなので。
    d3.select("body").append("a")
      .attr("href", canvas.toDataURL("image/png"))
      .attr("type", "application/octet-stream")
      .attr("download", 'dl.png')
      .text("ダウンロードできます")
  }
}