import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { SubSink } from 'subsink';
import { IConcept } from '../core/models/concepts.model';
import { BackendService } from '../core/services/backend.service';
import { DetailComponent } from './detail/detail.component';

@Component({
  selector: 'kb-concepts',
  templateUrl: './concepts.component.html',
  styleUrls: ['./concepts.component.scss']
})
export class ConceptsComponent implements OnInit {

  private subs = new SubSink();

  concepts:IConcept[] = [];

  columns:string[] =[
    "title",
    "difficulty",
    "lastRecalled",
    "status",
    "resource"
  ]

  filterChoices:string[][] = [
    [
      "Cake",
      "Average",
      "Formiddable",
      "Impossible"
    ],
    [
      "Not Started",
      "In Progress",
      "Done"
    ]
  ]

  filters:string[] = ["difficulty", "status"];

  displayNames:string[] = ["Title","Difficulty","Last Recalled", "Status"];

  
  

  constructor(private backend:BackendService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.subs.sink = this.backend.getConcepts()
      .subscribe(conceptAndMessage => {
        console.dir(conceptAndMessage);
        console.log(conceptAndMessage.message);
        this.concepts = conceptAndMessage.concepts;
        console.dir(this.concepts);
      })

  }

  detail(row:IConcept) {
    this.subs.sink = this.backend.getTasks(row._id || "")
      .subscribe(taskAndMessage => {
        console.dir(taskAndMessage);

        const dialogRef = this.dialog.open(DetailComponent, {
          width: '250px',
          data: { concept: row, tasks:taskAndMessage.tasks} 
        });
    
        this.subs.sink = dialogRef.afterClosed().subscribe(result => {
          console.dir(result);
        });
        
      })
   
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
