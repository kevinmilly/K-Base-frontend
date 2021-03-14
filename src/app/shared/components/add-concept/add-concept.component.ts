import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'kb-add-concept',
  templateUrl: './add-concept.component.html',
  styleUrls: ['./add-concept.component.scss']
})
export class AddConceptComponent implements OnInit {

  
  enterConcept:FormControl;

  constructor() { 
    this.enterConcept = new FormControl('',[Validators.required]);
  }

  ngOnInit(): void {
  }

}
