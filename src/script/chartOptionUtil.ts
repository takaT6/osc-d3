
import { PlotDataFormat } from '@/script/common';
import { ref } from "vue";

export class ChartOtpionUtil {
  public margin = {top: 20, right: 30, bottom: 25, left: 30};
  public width = document.body.clientWidth;
  public height = 420;
  public duration = 500;
  public color = ['#008000', '#ff0000'];

  public lineWidth = 1.0;

  public xAxis = {
    max: 5,
    min: -5,
    fontsize: 12,
    ticks: 10
  }

  public yAxis = {
    max: 10,
    min: -10,
    fontsize: 12,
    ticks: 10
  }

  public ismarklineSet = ref(false);

  public marklineVal = ref(5);

  public DATA_MAX_LENGTH = 10000;

  public dataArr: Array<PlotDataFormat> = [];
}