
import { Const, PlotDataFormat, ChartDataFormat } from '@/components/common';

export class ChartOtpionUtil {
  public xAxisMax = 5;
  public xAxisMin = -5;
  public yAxisMax = 10;
  public yAxisMin = -10;

  public margin = {top: 20, right: 20, bottom: 25, left: 50};
  public width = document.body.clientWidth;
  public height = 420;
  public duration = 500;
  public color = ['#008000', '#ff0000'];

  public isMarkLineSet = false;
  
  public DATA_MAX_LENGTH = 10000;

  public dataArr: Array<PlotDataFormat> = [];

  private count = 0.00;

  private randomNumberBounds = (min:number, max:number): number => {
    return Math.floor(Math.random() * max) + min;
  }

  public seedData = (): void => {
    // const now = new Date();
    for (let i = 0; i < this.DATA_MAX_LENGTH; ++i) {
      const now = this.count+=0.01;
      this.dataArr.push({
        time: now,
        value1: this.randomNumberBounds(0, 5),
        markLine: -5
      });
    }
  }

}