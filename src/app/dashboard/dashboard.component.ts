import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { IConcept } from '../core/models/concepts.model';
import { SubSink } from 'subsink';
import { BackendService } from '../core/services/backend.service';

@Component({
  selector: 'kb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    private subs = new SubSink();
   
    concept:IConcept[] = [];

    filterChosen:string = "level";

    filterChoices:string[][] = [ 
      [
        "Frivolous",
        "Somewhat Useful",
        "Very Useful",
        "Need to Know"
      ],
      [
        "Nincompoop",
        "Beginner",
        "Intermediate",
        "Expert",
        "1%"
      ]
    ]

     // Pie
     public pieChartOptions: ChartOptions = {
      responsive: true,
    };
    public pieLabels: Label[] = [];
    public pieData: SingleDataSet = [];
    public pieType: ChartType = 'pie';
    public pieLegend = true;

    public stackedBarLabel: string[] = [];
    public stackedData: number[] = [];
    public stackedNonData: number[] = [];
    public stackedBarLegend = true;
    public stackedBarType: ChartType = 'bar';
    public stackedBarChartOptions: ChartOptions = {
      responsive: true,
      animation: {
          duration: 10,
      },
      tooltips: {
                  mode: 'label'
      },
      scales: {
          xAxes: [{ 
              stacked: true, 
              gridLines: { display: false },
            }],
          yAxes: [{ 
              stacked: true, 
          }]
      }
    };
    public stackedBillableDataSets:any[] = [];

  constructor(private backend:BackendService) {
    monkeyPatchChartJsTooltip(); 
    monkeyPatchChartJsLegend();
   }

  ngOnInit(): void {
    this.backend.getConcepts();
    this.subs.sink = this.backend.concepts$
                  .subscribe(concepts => this.concept = concepts);
  }

  // this.filterChoices[1].forEach((choice,i) => {
  //   this.pieLabels.push(choice);
  //   this.pieData.push(this.concept.reduce((acc, curr) => acc + curr.level,0))
  // })

  filterPie(filterType:string) {
    switch (filterType) {
      case 'level':
        this.filterChoices[1].forEach((choice,i) => {
          this.pieLabels.push(choice);
          this.pieData.push(this.concept.reduce((acc, curr) => acc + (curr.level === i ? 1 : 0) ,0));
        })
        break;
      case 'necessity':
        this.filterChoices[0].forEach((choice,i) => {
          this.pieLabels.push(choice);
          this.pieData.push(this.concept.reduce((acc, curr) => acc + (curr.level === i ? 1 : 0) ,0));
        })
      break;
    }
  }

}
