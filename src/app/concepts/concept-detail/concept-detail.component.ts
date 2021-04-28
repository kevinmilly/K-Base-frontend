import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { IConcept } from 'src/app/core/models/concepts.model';
import { IControlModel } from 'src/app/core/models/control.model';
import { INote } from 'src/app/core/models/note.model';
import { BackendService } from 'src/app/core/services/backend.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'kb-concept-detail',
  templateUrl: './concept-detail.component.html',
  styleUrls: ['./concept-detail.component.scss']
})
export class ConceptDetailComponent implements OnInit {

  columns:string[] =[
    "title",
    "difficulty",
    "lastRecalled",
    "status",
    "completed"
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

  noteChoices:string[] = ['Random', 'Fundamental', 'Question']

  displayNames:string[] = ["Title","Difficulty","Last Recalled", "Status", "Completed"];

  filters:string[] = ["difficulty", "status"];

  editControls:IControlModel[] = [];
  addNoteControls:IControlModel[] = [];

   

  messages:string[] = [
    `Small steps motivate. Big steps overwhelm. - Maxime Lagacé`,
    `The first step is you have to say that you can. - Will Smith`,
    `A problem is a chance for you to do your best.- Duke Ellington `,
    `I am thankful to all who said no to me. 
     It is because of them that I’m doing it myself.- Albert Einstein`,
    `Be thankful for what you have; you’ll end up having more. - Oprah Winfrey`,
    `Try to be a rainbow in someone’s cloud. - Maya Angelou`,
    `With the new day comes new strength and new thoughts.  - Eleanor Roosevelt`,
    `Believe deep down in your heart that you’re destined to do great things - Joe Paterno`,
    `One person can make a difference, and everyone should try. - John F. Kennedy`,
    `Attitude is a little thing that makes a big difference. - Winston Churchill`,
    `I ask not for a lighter burden, but for broader shoulders. -  Jewish proverb`,
    `First say to yourself what you would be; and then do what you have to do. - Epictetus`,
    `The question isn’t who’s going to let me; it’s who is going to stop me. - Ayn Rand`,
    `I have decided to be happy, because it’s good for my health. - Voltaire`,
    `It doesn’t matter how slow you go, as long as you don’t stop. - Confucius`,
    `Always turn a negative situation into a positive situation. - Michael Jordan`,
    `The best way to predict the future is to create it. - Abraham Lincoln`,
    `The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt`,
    `Optimism is the faith that leads to achievement. 
      Nothing can be done without hope or confidence. - Helen Keller`
  ];

  concept:IConcept = {} as IConcept;
  notes:INote[] = [];
  
  private subs = new SubSink();

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {concept:IConcept, notes$:Observable<INote[]>},
    private dialogRef: MatDialogRef<ConceptDetailComponent>,
    private backend:BackendService
  ) { }

  ngOnInit(): void {
    
    this.concept = this.data.concept;
    this.subs.sink = this.backend.notes$
                .subscribe(notes => {
                  this.notes = notes;
                })

    this.editControls = [
      {
        name:"Title", 
        type:"string", 
        required:true, 
        default: this.concept.title,
  
      },
      {
        name:"Necessity", 
        type:"stringChoice", 
        required:true, 
        default:this.concept.necessity,
        stringChoices:this.necessityChoices
      },
      {
        name:"Level", 
        type:"stringChoice", 
        required:true, 
        default:this.concept.level,
        stringChoices:this.levelChoices
      },
      {
        name:"Tag", 
        type:"stringChoiceSet", 
        required:true, 
        default:this.concept.tag,
        stringChoices:this.tagChoices
      },
    ]

    this.addNoteControls = [
      {
        name:"Title", 
        type:"string", 
        required:true, 
        default: '',
  
      },
      {
        name:"Content", 
        type:"longString", 
        required:true, 
        default: '',
  
      },
      {
        name:"Source", 
        type:"string", 
        required:false, 
        default: '',
  
      },
      {
        name:"Type", 
        type:"stringChoice", 
        required:true, 
        default:0,
        stringChoices:this.noteChoices
      }
    ]
  }

  deleteNotes(eventObj:any) {
    console.dir(eventObj);
    eventObj.event.completed = true;
    this.dialogRef.close({event:eventObj.event, action:'delete', type:'note'});
  }



  submit(eventObj:any) {
    this._snackBar.open(this.messages[Math.floor(Math.random() * this.messages.length)], `Good Job!`, {
      duration: 4000,
    });
    eventObj["_id"] = this.concept._id;
    this.dialogRef.close({event:eventObj, action:'update', type:'concept'});
  }

  ngOnDestroy() {this.subs.unsubscribe()}

}
