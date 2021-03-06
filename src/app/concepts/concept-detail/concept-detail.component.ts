import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Necessity, Level, Tag, NoteChoice, Status } from 'src/app/core/models/enums/factors.enum';
import { ChoiceValue } from 'src/app/core/models/interfaces/choiceValue.model';
import { Concept } from 'src/app/core/models/interfaces/concepts.model';
import { CustomControl } from 'src/app/core/models/interfaces/control.model';
import { DetailFilterChoices } from 'src/app/core/models/interfaces/detailFilterChoices.model';
import { Note } from 'src/app/core/models/interfaces/note.model';
import { BackendService } from 'src/app/core/services/backend.service';
import { GamificationServiceService } from 'src/app/core/services/gamification-service.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'kb-concept-detail',
  templateUrl: './concept-detail.component.html',
  styleUrls: ['./concept-detail.component.scss']
})
export class ConceptDetailComponent implements OnInit {

  tabLabels:string[];

  columns: string[];

  filterChoices:DetailFilterChoices;

  necessityChoices:ChoiceValue[];
  levelChoices:ChoiceValue[];

  tagChoices: string[]; 

  noteChoices: string[];

  displayNames: string[];

  filters: string[];

  editControls: CustomControl[] = [];
  addNoteControls: CustomControl[] = [];

  concept: Concept = {} as Concept;
  notes: Note[] = [];

  private subs = new SubSink();

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { concept: Concept, notes$: Observable<Note[]> },
    private dialogRef: MatDialogRef<ConceptDetailComponent>,
    private backend: BackendService,
    private gamifyService: GamificationServiceService
  ) {

      this.tabLabels = ['Edit Concept','Add Note', 'Current Notes'];
      this.concept = this.data.concept;

      this.columns = ["title","difficulty","lastRecalled","status","completed"];
      this.filterChoices = {
        levels: [Level[0], Level[1], Level[2], Level[3], Level[4]],
        statuses:[Status[0],Status[1],Status[2]]
      }

      this.necessityChoices = [
        { name: Necessity[0], value: 0 },
        { name: Necessity[1], value: 1 }, 
        { name: Necessity[2], value: 2 },
        { name: Necessity[3], value: 3 }
      ]
      this.levelChoices = [
        { name: Level[0], value: 0 },
        { name: Level[1], value: 1 },
        { name: Level[2], value: 2 },
        { name: Level[3], value: 3 },
        { name: Level[4], value: 4 }
      ]

      this.tagChoices = [Tag[0], Tag[1], Tag[2], Tag[3]];
      this.noteChoices  = [NoteChoice[0], NoteChoice[1], NoteChoice[2]];
      this.filters = ["difficulty", "status"];

      this.displayNames = ["Title", "Difficulty", "Last Recalled", "Status", "Completed"];

      this.addNoteControls = [
        {name: "Title",type: "string",required: true,default: '',},
        {name: "Content",type: "longString",required: true,default: '',},
        {name: "Resource", type: "autocomplete-select",required: false,default: 'http://www.google.com',autoCompleteOptions: this.backend.resources$.pipe(map(resources => resources.map(r => r.title)))},
        {name: "Type", type: "stringChoiceSet",required: true,default: 0,stringChoices: this.noteChoices}
      ]

      this.editControls = [
        {name: "Title",type: "string",required: true,default: this.concept.title,},
        {name: "Necessity",type: "stringChoice",required: true,default: this.concept.necessity,stringChoices: this.necessityChoices},
        {name: "Level",type: "stringChoice",required: true,default: this.concept.level,stringChoices: this.levelChoices },
        { name: "Tag",type: "stringChoiceSet",required: true,default: this.concept.tag,stringChoices: this.tagChoices },
      ]
   }

  ngOnInit(): void {
    this.backend.getNotesByConcept(this.concept._id);
    this.subs.sink = this.backend.notes$
      .subscribe(notes => {
        this.notes = notes;
      })

     this.backend.getResources(this.concept);

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
