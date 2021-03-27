import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IConcept } from 'src/app/core/models/concepts.model';
import { BackendService } from 'src/app/core/services/backend.service';

@Component({
  selector: 'kb-quick-add-concept',
  templateUrl: './quick-add-concept.component.html',
  styleUrls: ['./quick-add-concept.component.scss']
})
export class AddConceptComponent implements OnInit {

  
  enterConcept:FormControl;

  constructor(private backend:BackendService) { 
    this.enterConcept = new FormControl('',[Validators.required]);
  }

  ngOnInit(): void {

  }

  submit() {
    this.backend.addConcepts({
      title: this.enterConcept.value,
      necessity: 3,
      level: 0,
      dependentConcepts:[],
      relatedNotes:[],
      lastRecalled: new Date().toDateString(),
      completed:false,
      tag:"Potpourri",
      details:''
    } as IConcept)
    this.enterConcept.reset();
  }

  enterSubmit(event:any) {
    if (event.keyCode === 13) {
      this.backend.addConcepts({
        title: this.enterConcept.value,
        necessity: 3,
        level: 0,
        dependentConcepts:[],
        relatedNotes:[],
        lastRecalled: new Date().toDateString(),
        completed:false,
        tag:"Potpourri",
        details:''
      } as IConcept)
      this.enterConcept.reset();
     
    }
  }

}
