import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomControl } from 'src/app/core/models/control.model';
import { NoteChoice } from 'src/app/core/models/enums/factors.enum';
import { INote } from 'src/app/core/models/note.model';

@Component({
  selector: 'kb-notes-display',
  templateUrl: './notes-display.component.html',
  styleUrls: ['./notes-display.component.scss']
})
export class NotesDisplayComponent implements OnInit {

  displayMode: FormControl = new FormControl(false, []);

  note!: INote;

  noteChoices: string[] = [NoteChoice[0], NoteChoice[1], NoteChoice[2]]

  editNoteControls: CustomControl[] = [
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
      name: "Source",
      type: "string",
      required: false,
      default: '',

    },
    {
      name: "Type",
      type: "stringChoice",
      required: true,
      default: 0,
      stringChoices: this.noteChoices
    }
  ];


  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { note: INote },
    private dialogRef: MatDialogRef<NotesDisplayComponent>
  ) { }

  ngOnInit(): void {
    this.note = this.data.note;
  }


  submit(eventObj: any) {

    this.dialogRef.close({ event: eventObj, type: 'update' });
  }

}
