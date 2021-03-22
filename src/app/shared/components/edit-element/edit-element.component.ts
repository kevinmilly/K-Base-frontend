import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { error } from 'node:console';

interface IControlModel {
  name:string, 
  type:string, 
  required:boolean, 
  default:any,
  numberMax?:number,
  numberMin?:number
};

@Component({
  selector: 'kb-edit-element',
  templateUrl: './edit-element.component.html',
  styleUrls: ['./edit-element.component.scss']
})
export class EditElementComponent implements OnInit {

  @Input() controlsToCreate:IControlModel[] = [];

  form:FormGroup = new FormGroup({
    controlsCreated: new FormArray([])
  })


  constructor() { }

  ngOnInit(): void {

  }

  generateControls(controlsToCreate:IControlModel[]) {
    let vals = [];
    controlsToCreate.forEach(c => {
      vals = [];
      switch (c.type) {
        case "string":
          if(c.required) vals.push(Validators.required);
          this.controlsCreated.push(
            new FormControl(c.default,vals)
          )
          break;
        case "number":
          if(c.required) vals.push(Validators.required);
          if(!c.numberMax && !c.numberMin) {
            console.error("You need to specify min or max with number");
            break;
          }
          vals.push(Validators.min(c.numberMin || 0));
          vals.push(Validators.min(c.numberMax || 2));
          this.controlsCreated.push(
            new FormControl(c.default,vals)
          )
          break;
        case "boolean":
          if(c.required) vals.push(Validators.required);
          this.controlsCreated.push(
            new FormControl(c.default,vals)
          )
          break;
     
      }
    });
  }

  get controlsCreated() {
    return this.form.get('controlsCreated') as FormArray;
  }

}
