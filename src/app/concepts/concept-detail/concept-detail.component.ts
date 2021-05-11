import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IConcept } from 'src/app/core/models/concepts.model';
import { IControlModel } from 'src/app/core/models/control.model';
import { INote } from 'src/app/core/models/note.model';
import { BackendService } from 'src/app/core/services/backend.service';
import { GamificationServiceService } from 'src/app/core/services/gamification-service.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'kb-concept-detail',
  templateUrl: './concept-detail.component.html',
  styleUrls: ['./concept-detail.component.scss']
})
export class ConceptDetailComponent implements OnInit {

  columns: string[] = [
    "title",
    "difficulty",
    "lastRecalled",
    "status",
    "completed"
  ]

  filterChoices: string[][] = [
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
    { name: "Frivolous", value: 0 },
    { name: "Somewhat Useful", value: 1 },
    { name: "Very Useful", value: 2 },
    { name: "Need to Know", value: 3 }
  ]

  levelChoices = [
    { name: "Nincompoop", value: 0 },
    { name: "Beginner", value: 1 },
    { name: "Intermediate", value: 2 },
    { name: "Expert", value: 3 },
    { name: "1%", value: 4 }
  ]

  tagChoices = [
    "Bible",
    "Programming",
    "Language Studies",
    "Potpourri"
  ]

  noteChoices: string[] = ['Random', 'Fundamental', 'Question']

  displayNames: string[] = ["Title", "Difficulty", "Last Recalled", "Status", "Completed"];

  filters: string[] = ["difficulty", "status"];

  editControls: IControlModel[] = [];
  addNoteControls: IControlModel[] = [];





  concept: IConcept = {} as IConcept;
  notes: INote[] = [];

  private subs = new SubSink();

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { concept: IConcept, notes$: Observable<INote[]> },
    private dialogRef: MatDialogRef<ConceptDetailComponent>,
    private backend: BackendService,
    private gamifyService: GamificationServiceService
  ) { }

  ngOnInit(): void {

    this.concept = this.data.concept;
    this.backend.getNotesByConcept(this.concept._id);
    this.subs.sink = this.backend.notes$
      .subscribe(notes => {
        this.notes = notes;
      })

    this.backend.getResources(this.concept);

    this.editControls = [
      {
        name: "Title",
        type: "string",
        required: true,
        default: this.concept.title,

      },
      {
        name: "Necessity",
        type: "stringChoice",
        required: true,
        default: this.concept.necessity,
        stringChoices: this.necessityChoices
      },
      {
        name: "Level",
        type: "stringChoice",
        required: true,
        default: this.concept.level,
        stringChoices: this.levelChoices
      },
      {
        name: "Tag",
        type: "stringChoiceSet",
        required: true,
        default: this.concept.tag,
        stringChoices: this.tagChoices
      },
    ]

    this.addNoteControls = [
      {
        name: "Title",
        type: "string",
        required: true,
        default: '',

      },
      {
        name: "Content",
        type: "longString",
        required: true,
        default: '',

      },
      {
        name: "Resource",
        type: "autocomplete-select",
        required: false,
        default: 'http://www.google.com',
        autoCompleteOptions: this.backend.resources$.pipe(map(resources => resources.map(r => r.title)))


      },
      {
        name: "Type",
        type: "stringChoiceSet",
        required: true,
        default: 0,
        stringChoices: this.noteChoices
      }
    ]
  }

  deleteNotes(eventObj: any) {

    eventObj.event.completed = true;
    this.dialogRef.close({ event: eventObj.event, action: 'delete', type: 'note' });
  }



  editConcept(eventObj: any) {
    eventObj["_id"] = this.concept._id;
    this.dialogRef.close({ event: eventObj, action: 'update', type: 'concept' });
  }

  addNote(eventObj: any) {
    this._snackBar.open(this.gamifyService.getQuoteMessage(), `Good Job!`, {
      duration: 4000,
    });
    eventObj["relatedConcept"] = this.concept._id;
    this.dialogRef.close({ event: eventObj, action: 'add', type: 'note' });
  }



  ngOnDestroy() { this.subs.unsubscribe() }

}
