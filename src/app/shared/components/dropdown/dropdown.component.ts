import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'kb-dropdown',
  template: `
    <mat-form-field>
      <mat-select 
        [formControl]="selected" 
        (change)="onChoice()"
        multiple>
        <mat-option *ngFor="let choice of list" [value]="choice">{{choice}}</mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {

  @Input() list:string[];
  @Output() onChoiceEmitter:EventEmitter<string>;
  selected:FormControl;

  constructor() { 
    this.list  = [];
    this.onChoiceEmitter = new EventEmitter<string>();
    this.selected= new FormControl();
  }

  ngOnInit(): void {
  
  }

  onChoice() {
    this.onChoiceEmitter.emit(this.selected.value);
  }

}
