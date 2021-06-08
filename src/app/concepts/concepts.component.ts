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
import { MatSnackBar } from '@angular/material/snack-bar';
import { GamificationServiceService } from '../core/services/gamification-service.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { PopupExampleComponent } from '../shared/components/popup-example/popup-example.component';


@Component({
  selector: 'kb-concepts',
  templateUrl: './concepts.component.html',
  styleUrls: ['./concepts.component.scss']
})
export class ConceptsComponent implements OnInit {

  private media$!: Observable<MediaChange[]>;

  private subs = new SubSink();

  concepts:IConcept[] = [];
  filteredConcepts:any = [];


  //kanban tab

  selectedFilter: string = 'level';

  boxDetails:string[] = [
    "necessity",
    "level" ,
    "tag"
  ];

  kanbanLabels:string[] = [];
  kanbanHeaders:string[] = [];

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

//table tab

columns:string[] =[
  "action",
  "title",
  "necessity",
  "level",
  "tag"
]

  tagChoices = [
    "Bible",
    "Programming",
    "Language Studies",
    "Potpourri"
  ]

  filters:string[] = ["necessity", "level"];

  displayNames:string[] = ["Actions","Title", "Necessity","Level", "Tag"];


  //add Concept tab

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
      default:"Programming",
      stringChoices:this.tagChoices
    },
  ];

  mediaSize:string = '';

  sizes:string[] = ['xs','sm','md','lg','xl','lt-sm',
  'lt-md','lt-lg','lt-xl','gt-xs','gt-sm','gt-md','gt-lg'];

   
  
 
  constructor(
    private backend:BackendService, 
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private gamifyService:GamificationServiceService,
    private _snackBar: MatSnackBar,
    private media:MediaObserver
    ) {
        this.media$ = media.asObservable();
     }

  ngOnInit(): void { //put the method in the constructor

    this.subs.sink = this.media$.subscribe(m => this.mediaSize = m[0].mqAlias);

    this.spinner.show();
    this.backend.getConcepts();
    this.subs.sink = this.backend.concepts$
      .subscribe(concepts => {
        console.dir(this.concepts);
        this.concepts = [...concepts];
        if(concepts.length > 0) {
          this.filterConceptsForKanban(this.selectedFilter);
        }

        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 2000);
       
      })

    

  }

  filterConceptsForKanban(selectedFilter:string) {
    this.filteredConcepts = [];
    switch (selectedFilter) {
      case 'level':
        this.filterChoices[1].forEach((choice, i) => {
          this.filteredConcepts.push(this.concepts.filter(concept => concept.level === i));
        })
        this.kanbanLabels = this.boxDetails.filter(detail => detail !== 'level');
        this.kanbanHeaders = this.filterChoices[1];
        break;

      case 'necessity':
        this.filterChoices[0].forEach((choice, i) => {
          this.filteredConcepts.push(this.concepts.filter(concept => concept.necessity === i));
        })
        this.kanbanLabels = this.boxDetails.filter(detail => detail !== 'necessity');
        this.kanbanHeaders = this.filterChoices[0];
        break;

      case 'tag':
        this.tagChoices.forEach((choice, i) => {
          this.filteredConcepts.push(this.concepts.filter(concept => concept.tag === this.tagChoices[i]));
        })
        this.kanbanLabels = this.boxDetails.filter(detail => detail !== 'tag');
        this.kanbanHeaders= this.tagChoices;
        break;
      case 'all':
        this.filteredConcepts = [...this.concepts];
        this.kanbanLabels = this.boxDetails.filter(detail => detail !== 'tag');
        this.kanbanHeaders= this.tagChoices;
        break;
    }
  }



  detail(row:IConcept) {
    this.backend.getNotesByConcept(row._id || "");
    this.subs.sink = this.backend.notes$
                      .subscribe(n => {
        const dialogRef = this.dialog.open(ConceptDetailComponent, {
          width: '250px',
          data: { concept: row, notes:n} 
        });
    
        this.subs.sink = dialogRef.afterClosed().subscribe(result => {

        });
        
      })
   
  }

  submit(event:any) {

    this.backend.addConcepts(event);
    this._snackBar.open(this.gamifyService.getQuoteMessage(), `Successfully Added!`, {
      duration: 4000,
    });
  }

  deleteConcept(event:any) {
    this.backend.deleteConcept(event);
  }

  howToAddConcept() {
    const dialogRef = this.dialog.open(PopupExampleComponent, {
      width: 'auto',
      height: 'auto',
      data: '../../assets/images/howto/howtoaddconcept.gif'
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
