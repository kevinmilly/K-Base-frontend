import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { IConcept } from '../core/models/concepts.model';
import { BackendService } from '../core/services/backend.service';

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
    "status"
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

  

  constructor(private backend:BackendService) { }

  ngOnInit(): void {
    this.subs.sink = this.backend.getConcepts()
      .subscribe(conceptAndMessage => {
        console.log(conceptAndMessage.m);
        this.concepts = conceptAndMessage.c;
      })

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}