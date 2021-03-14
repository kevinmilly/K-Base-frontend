import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BackendService } from 'src/app/core/services/backend.service';

@Component({
  selector: 'kb-add-concept',
  templateUrl: './add-concept.component.html',
  styleUrls: ['./add-concept.component.scss']
})
export class AddConceptComponent implements OnInit {

  
  enterConcept:FormControl;

  constructor(private backend:BackendService) { 
    this.enterConcept = new FormControl('',[Validators.required]);
  }

  ngOnInit(): void {

  }

  submit() {
    this.backend.addConcepts({...this.enterConcept.value})
  }

}
