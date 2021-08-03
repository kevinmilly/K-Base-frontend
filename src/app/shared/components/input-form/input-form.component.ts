import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Concept } from 'src/app/core/models/concepts.model';
import { CustomControl } from 'src/app/core/models/control.model';



@Component({
  selector: 'kb-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {

  @Input() controlsToCreate: CustomControl[] = [];
  @Input() orientation: string = 'horizontal';
  @Output() onSubmit = new EventEmitter();




  submission: any = {} as Concept;

  inputForm: FormGroup = new FormGroup({
    controlsCreated: new FormArray([])
  });;



  constructor() { }

  ngOnInit(): void {

    this.generateControls(this.controlsToCreate);


  }

  generateControls(controlsToCreate: CustomControl[]) {
    let vals = [];
    controlsToCreate.forEach(c => {
      vals = [];
      switch (c.type) {
        case "string":
          if (c.required) vals.push(Validators.required);
          this.controlsCreated.push(
            new FormControl(c.default, vals)
          )
          break;
        case "longString":
          if (c.required) vals.push(Validators.required);
          this.controlsCreated.push(
            new FormControl(c.default, vals)
          )
          break;
        case "stringChoice":
          if (c.required) vals.push(Validators.required);
          this.controlsCreated.push(
            new FormControl(c.default, vals)
          )
          break;
        case "stringChoiceSet":
          if (c.required) vals.push(Validators.required);
          this.controlsCreated.push(
            new FormControl(c.default, vals)
          )
          break;
        case "number":
          if (c.required) vals.push(Validators.required);
          if (!c.numberMax && !c.numberMin) {

            break;
          }
          vals.push(Validators.min(c.numberMin || 0));
          vals.push(Validators.min(c.numberMax || 2));
          this.controlsCreated.push(
            new FormControl(c.default, vals)
          )
          break;
        case "boolean":
          if (c.required) vals.push(Validators.required);
          this.controlsCreated.push(
            new FormControl(c.default, vals)
          )
          break;
        case "autocomplete-select":
          if (c.required) vals.push(Validators.required);
          this.controlsCreated.push(
            new FormControl(c.default, vals)
          )
          break;
        case "email":
          if (c.required) vals.push(Validators.required, Validators.email);
          this.controlsCreated.push(
            new FormControl(c.default, vals)
          )
          break;
        case "password":
          if (c.required) vals.push(Validators.required); //@TODO: add custom validator for password strength
          this.controlsCreated.push(
            new FormControl(c.default, vals)
          )
          break;
      }
    });

  }

  submit() {
    this.controlsToCreate.forEach((control, i) => {

      this.submission[control.name.toLowerCase()] = this.controlsCreated[i].value;
    });

    this.onSubmit.emit(this.submission);
    // this.controlsCreated.forEach((control, i) => {
    //   control.setValue(this.controlsToCreate[i].default)
    // });
    this.inputForm.reset();
  }

  get controlsCreated() {
    return (this.inputForm.controls['controlsCreated'] as FormArray).controls;
  }

  indexedCreatedControls(i: number) { return this.controlsCreated[i] as FormControl }

}
