import {Component, Input, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import * as EventEmitter from 'node:events';
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

  @Input() list:string[] = [];
  @Output() onChoiceEmitter:EventEmitter = new EventEmitter();
  selected = new FormControl();
  selected$:Observable<string> = new Observable();

  constructor() { }

  ngOnInit(): void {
  
  }

  onChoice() {
    this.onChoiceEmitter.emit(this.selected.value);
  }

}
