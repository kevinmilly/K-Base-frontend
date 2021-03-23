import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IControlModel } from 'src/app/core/models/control.model';



@Component({
  selector: 'kb-edit-element',
  templateUrl: './edit-element.component.html',
  styleUrls: ['./edit-element.component.scss']
})
export class EditElementComponent implements OnInit {

  @Input() controlsToCreate:IControlModel[] = [];


 controlsCreated:FormArray = new FormArray([]);



  constructor() { }

  ngOnInit(): void {
    this.generateControls(this.controlsToCreate);
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
        case "stringChoice":
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
    console.dir(this.controlsCreated);
  }

  submit() {}

  get createdControls() {
    return this.controlsCreated.controls;
  }

  indexedCreatedControls(i:number) { return this.createdControls[i] as FormControl}

}
