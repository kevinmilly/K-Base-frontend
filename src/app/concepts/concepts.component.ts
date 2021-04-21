import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { SubSink } from 'subsink';
import { IConcept } from '../core/models/concepts.model';
import { IControlModel } from '../core/models/control.model';
import { INote } from '../core/models/note.model';
import { BackendService } from '../core/services/backend.service';
import { ConceptDetailComponent } from './concept-detail/concept-detail.component';

import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'kb-concepts',
  templateUrl: './concepts.component.html',
  styleUrls: ['./concepts.component.scss']
})
export class ConceptsComponent implements OnInit {

  private subs = new SubSink();

  concepts:IConcept[] = [];
  filteredConcepts:any = [];

  columns:string[] =[
    "action",
    "title",
    "necessity",
    "level",
    "tag"
  ]

  boxDetails:string[] = [
    "notes",
    "necessity",
    "level" ,
    "tag"
  ];

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

  necessityChoices = [
    {name: "Frivolous", value:0},
    {name:"Somewhat Useful", value:1},
    {name: "Very Useful", value:2},
    {name:"Need to Know", value: 3}
  ] 

  levelChoices = [
    {name: "Nincompoop", value:0},
    {name:"Beginner", value:1},
    {name: "Intermediate", value:2},
    {name:"Expert", value: 3},
    {name:"1%", value: 4}
  ]

  tagChoices = [
    "Bible",
    "Programming",
    "Language Studies",
    "Potpourri"
  ]

  filters:string[] = ["necessity", "level"];

  displayNames:string[] = ["Actions","Title", "Necessity","Level", "Tag"];

  addConceptControls:IControlModel[] = [
    {
      name:"Title", 
      type:"string", 
      required:true, 
      default: '',

    },
    {
      name:"Necessity", 
      type:"stringChoice", 
      required:true, 
      default:1,
      stringChoices:this.necessityChoices
    },
    {
      name:"Level", 
      type:"stringChoice", 
      required:true, 
      default:1,
      stringChoices:this.levelChoices
    },
    {
      name:"Tag", 
      type:"stringChoiceSet", 
      required:true, 
      default:1,
      stringChoices:this.tagChoices
    },
  ];

  
  

  constructor(
    private backend:BackendService, 
    public dialog: MatDialog,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void { //put the method in the constructor
    this.spinner.show();

    this.backend.getConcepts();
    this.subs.sink = this.backend.concepts$
      .subscribe(concepts => {;
        this.concepts = concepts;
        console.dir(this.concepts);
        if(concepts.length > 0) {
          this.filterChoices[1].forEach((choice, i) => {
            this.filteredConcepts.push(this.concepts.filter(concept => concept.level === i));
          })
        }

        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 2000);
       
      })

  }

  detail(row:IConcept) {
    this.backend.getNotesByConcept(row._id || "");
    this.subs.sink = this.backend.notes$
                      .subscribe(n => {
        // console.dir(noteAndMessage);

        const dialogRef = this.dialog.open(ConceptDetailComponent, {
          width: '250px',
          data: { concept: row, notes:n} 
        });
    
        this.subs.sink = dialogRef.afterClosed().subscribe(result => {
          // console.dir(result);
        });
        
      })
   
  }

  submit(event:any) {
    console.log({event});
    this.backend.addConcepts(event);
  }

  deleteConcept(event:any) {
    this.backend.deleteConcept(event);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
