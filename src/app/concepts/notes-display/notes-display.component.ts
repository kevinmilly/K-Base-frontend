import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IControlModel } from 'src/app/core/models/control.model';
import { INote } from 'src/app/core/models/note.model';

@Component({
  selector: 'kb-notes-display',
  templateUrl: './notes-display.component.html',
  styleUrls: ['./notes-display.component.scss']
})
export class NotesDisplayComponent implements OnInit {

  displayMode:FormControl = new FormControl(false, []);
  
  note!:INote;

  noteChoices:string[] = ['Random', 'Fundamental', 'Question']

  editNoteControls:IControlModel[] = [
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
  ];


  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {note:INote},
    private dialogRef: MatDialogRef<NotesDisplayComponent>
  ) { }

  ngOnInit(): void {
    this.note = this.data.note;
  }


  submit(eventObj: any) {
    console.dir(eventObj);
    this.dialogRef.close({event:eventObj, type:'update'});
  }

}
