import { Const, PlotDataFormat } from '@/script/common';
import { ref } from "vue";
export class ChartOtpionUtil {
  public chartID = "";
  public margin = {top: 20, right: 10, bottom: 40, left: 50};
  public width = document.body.clientWidth*0.95;
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
    fontsize: 10,
    ticks: 10
  }

  public isTimer = true;

  public timer = 3000;

  public isMarklineSet = ref(false);

  public marklineVal = ref(5);

  // public DATA_MAX_LENGTH = 10000;
  public DATA_MAX_LENGTH = 3000;

  public dataArr: Array<PlotDataFormat> = [];
}