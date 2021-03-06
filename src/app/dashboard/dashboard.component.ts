import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';
import { SubSink } from 'subsink';
import { BackendService } from '../core/services/backend.service';
import { Level, Necessity } from '../core/models/enums/factors.enum';
import { Concept } from '../core/models/interfaces/concepts.model';
import { GeneralFilterChoices } from '../core/models/interfaces/generalFilterChoices.model';

@Component({
  selector: 'kb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private subs = new SubSink();

  concept: Concept[];

  filterChosen: string;

  filterChoices: GeneralFilterChoices;

  // Pie
  public pieOptions: ChartOptions = {
    responsive: true,
  };
  public pieLabels: Label[] = [];
  public pieData: SingleDataSet = [];
  public pieType: ChartType = 'pie';
  public pieLegend = true;

  public chartColors: Color[] = [
    { backgroundColor: ['#f54298', '#dd42f', '#ffa3f3', '#42f5da'] }
  ]

  public barChartColors: Color[] = [{ backgroundColor: ['#42f5da', '#f54298'] }];

  public barChartLabels: string[] = [];
  public barChartOptions: ChartOptions = {
    responsive: true
  };
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Level', stack: 'a' },
    { data: [], label: 'Necessity', stack: 'a' },
  ];

  constructor(private backend: BackendService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    this.concept  = [];
    this.filterChosen = "level";

    this.filterChoices = {
      necessities: [Necessity[0], Necessity[1], Necessity[2], Necessity[3]],
      levels: [Level[0], Level[1], Level[2], Level[3], Level[4]]
    }


  }

  ngOnInit(): void {
    this.backend.getConcepts();
    this.subs.sink = this.backend.concepts$
      .subscribe(concepts => {
        this.concept = concepts;
        this.filterPie('level');
        this.buildLeaderChart();
      });
  }



  filterPie(filterType: string) {
    this.pieLabels = [];
    this.pieData = [];
    switch (filterType) {
      case 'level':
        this.filterChoices.levels.forEach((choice, i) => {
          this.pieLabels.push(choice);
          this.pieData.push(this.concept.reduce((acc, curr) => acc + (curr.level === i ? 1 : 0), 0));
        })
        break;
      case 'necessity':
        this.filterChoices.necessities.forEach((choice, i) => {
          this.pieLabels.push(choice);
          this.pieData.push(this.concept.reduce((acc, curr) => acc + (curr.level === i ? 1 : 0), 0));
        })
        break;
    }
  }

  buildLeaderChart() {

    //for each concept add the necessity and level and get top 10
    const sortedLevel = this.concept.sort((a, b) => b.level - a.level)
      .slice(0, 9);
    const sortedNecessity = this.concept.sort((a, b) => b.necessity - a.necessity)
      .slice(0, 9);


    //pump the data into the datasets and the concept titles into the labels
    this.barChartData[0].data = [];
    this.barChartData[1].data = [];
    this.barChartLabels = [];

    sortedLevel.forEach((c, index) => {
      this.barChartData[0].data?.push(c.level);
      this.barChartLabels.push(c.title);
      this.barChartData[1].data?.push(sortedNecessity[index].necessity)
    })


  }



}
