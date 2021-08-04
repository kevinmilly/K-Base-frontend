import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { NoteChoice } from 'src/app/core/models/enums/factors.enum';
import { CustomControl } from 'src/app/core/models/interfaces/control.model';
import { Note } from 'src/app/core/models/interfaces/note.model';


@Component({
  selector: 'kb-notes-display',
  templateUrl: './notes-display.component.html',
  styleUrls: ['./notes-display.component.scss']
})
export class NotesDisplayComponent implements OnInit {

  displayMode: FormControl;

  note!: Note;

  noteChoices: string[];

  editNoteControls: CustomControl[];

  


  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { note: Note },
    private dialogRef: MatDialogRef<NotesDisplayComponent>
  ) {
    
    this.displayMode = new FormControl(false, []);

    this.noteChoices  = [NoteChoice[0], NoteChoice[1], NoteChoice[2]];
      this.editNoteControls = [
        {name: "Title",type: "string",required: true,default: this.note.title,},
        {name: "Content",type: "longString",required: true,default: this.note.content},
        {name: "Source", type: "string", required:false, default: this.note.source},
        { name: "Type",type: "stringChoice",required: true,default: this.note.type, stringChoices: this.noteChoices },
      ]

   }

  ngOnInit(): void {
    this.note = this.data.note;
  }


  submit(eventObj: any) {

    this.dialogRef.close({ event: eventObj, type: 'update' });
  }

}
