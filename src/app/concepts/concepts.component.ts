import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { SubSink } from 'subsink';
import { IConcept } from '../core/models/concepts.model';
import { IControlModel } from '../core/models/control.model';
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
  filteredConcepts:any = [];

  columns:string[] =[
    "action",
    "title",
    "necessity",
    "level",
    "tag",
    "notes" ,
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

  filters:string[] = ["necessity", "level"];

  displayNames:string[] = ["Actions","Title", "Necessity","Level", "Tag", "Notes",];

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
      stringChoices:this.filterChoices[0]
    },
    {
      name:"Level", 
      type:"stringChoice", 
      required:true, 
      default:1,
      stringChoices:this.filterChoices[1]
    },
  ];

  
  

  constructor(private backend:BackendService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.subs.sink = this.backend.getConcepts()
      .subscribe(conceptAndMessage => {
        this.concepts = conceptAndMessage.concepts;
        // console.dir(this.concepts);
      
        this.filterChoices[1].forEach((choice, i) => {
          this.filteredConcepts.push(this.concepts.filter(concept => {
            // console.log(`i is ${i} and concept level is ${concept.level}`);
            // console.dir(concept);
            return concept.level === i;
       }))
        })
      // console.dir(this.filteredConcepts);
 

      })

  }

  detail(row:IConcept) {
    this.subs.sink = this.backend.getNotesByConcept(row._id || "")
      .subscribe(noteAndMessage => {
        // console.dir(noteAndMessage);

        const dialogRef = this.dialog.open(ConceptDetailComponent, {
          width: '250px',
          data: { concept: row, notes:noteAndMessage.notes} 
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
    console.log({event});
    console.log("Delete triggered");
    this.backend.deleteConcept(event);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
