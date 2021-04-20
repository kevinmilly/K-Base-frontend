import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IConcept } from 'src/app/core/models/concepts.model';
import { IControlModel } from 'src/app/core/models/control.model';



@Component({
  selector: 'kb-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {

  @Input() controlsToCreate:IControlModel[] = [];
  @Output() onSubmit = new EventEmitter();


 controlsCreated:FormArray = new FormArray([]);

 submission:any = {} as IConcept;



  constructor() { }

  ngOnInit(): void {
    console.dir(this.controlsToCreate);
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
        case "longString": 
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
        case "stringChoiceSet":
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

  submit() {
    console.log("Submit entered");
    this.controlsToCreate.forEach((control, i) => {
      // console.dir(this.controlsCreated.controls[i]);
      this.submission[control.name.toLowerCase()] = this.controlsCreated.controls[i].value;
    });
    console.dir(this.submission);
    this.onSubmit.emit(this.submission);
    this.controlsCreated.controls.forEach((control, i) => {
      control.setValue(this.controlsToCreate[i].default)
    });
  }

  get createdControls() {
    return this.controlsCreated.controls;
  }

  indexedCreatedControls(i:number) { return this.createdControls[i] as FormControl}

}
