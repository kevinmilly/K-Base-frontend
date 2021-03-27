import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { SubSink } from 'subsink';
import { IConcept } from '../core/models/concepts.model';
import { BackendService } from '../core/services/backend.service';
import { ConceptDetailComponent } from './concept-detail/concept-detail.component';

@Component({
  selector: 'kb-concepts',
  templateUrl: './concepts.component.html',
  styleUrls: ['./concepts.component.scss']
})
export class ConceptsComponent implements OnInit {

  private subs = new SubSink();

  concepts:IConcept[] = [];

  columns:string[] =[
    "action",
    "title",
    "necessity",
    "level",
    "details" ,
    "tag"
  ]

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

  filters:string[] = ["necessity", "level"];

  displayNames:string[] = ["Actions","Title","Necessity","Status", "Details", "Tag"];

  
  

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

        const dialogRef = this.dialog.open(ConceptDetailComponent, {
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
