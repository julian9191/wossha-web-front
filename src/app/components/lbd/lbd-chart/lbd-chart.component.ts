import {Component, Input, OnInit, AfterViewInit, ChangeDetectionStrategy} from '@angular/core';
import * as Chartist from 'chartist';

export interface LegendItem {
  title: string;
  imageClass: string;
}

export enum ChartType {
  Pie,
  Line,
  Bar
}

@Component({
  selector: 'lbd-chart',
  templateUrl: './lbd-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LbdChartComponent implements OnInit/*, AfterViewInit */{
  static currentId = 1;
  @Input()
  public initComponent:boolean = false;

  @Input()
  public title: string;

  @Input()
  public subtitle: string;

  @Input()
  public chartClass: string;

  @Input()
  public chartType: ChartType;

  @Input()
  public chartData: any;

  @Input()
  public chartOptions: any;

  @Input()
  public chartResponsive: any[];

  @Input()
  public footerIconClass: string;

  @Input()
  public footerText: string;

  @Input()
  public legendItems: LegendItem[];

  @Input()
  public withHr: boolean;

  public chartId: string;

  public colors:string[];


  constructor() {
    
  }

  public ngOnInit(): void {
    this.colors = [];
    this.colors[0] = "#23CCEF";
    this.colors[1] = "#FB404B";
    this.colors[2] = "#FFA534";
    this.colors[3] = "#9368E9";
    this.colors[4] = "#87CB16";
    this.colors[5] = "#447DF7";
    this.colors[6] = "#5e5e5e";
    this.colors[7] = "#dd4b39";
    this.colors[8] = "#35465c";
    this.colors[9] = "#e52d27";
    this.colors[10] = "#55acee";
    this.colors[11] = "#cc2127";
    this.colors[12] = "#1769ff";
    this.colors[13] = "#6188e2";
    this.colors[14] = "#a748ca";

    this.chartId = `lbd-chart-${LbdChartComponent.currentId++}`;
  }

  public /*ngAfterViewInit*/init(): void {
    switch (this.chartType) {
      case ChartType.Pie:
        new Chartist.Pie(`#${this.chartId}`, this.chartData, this.chartOptions, this.chartResponsive);
        break;
      case ChartType.Line:
        new Chartist.Line(`#${this.chartId}`, this.chartData, this.chartOptions, this.chartResponsive);
        break;
      case ChartType.Bar:
        new Chartist.Bar(`#${this.chartId}`, this.chartData, this.chartOptions, this.chartResponsive);
        break;
    }
  }

  checkInit(){
    if(this.initComponent){
      this.init();
      this.initComponent=false;
    }
    return true;
  }
}
