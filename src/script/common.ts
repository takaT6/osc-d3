export const Const = {
  WS_ADDRESS: 'ws://localhost:8088/echo',
  // WS_ADDRESS: "ws://192.168.11.2:8088/echo",
  GRAPH_ID: 'graph',
}

export const TW ={
  BTN_ABLED: 'rounded-full bg-sky-500 px-4 py-2 hover:bg-sky-700',
  BTN_DISABLED: 'rounded-full bg-sky-500 px-4 py-2 hover:bg-sky-700 opacity-50 cursor-not-allowed',
  LABEL: 'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-black dark:text-white',
  INPUT: 'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 my-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500',
  RANGE: 'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700',

}

export interface PlotDataFormat {
  time: number,
  channel1: number
}

export interface ChartDataFormat{
  label: string,
  channels: Array<PlotDataFormat>,
}