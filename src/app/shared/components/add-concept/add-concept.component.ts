import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IConcept } from 'src/app/core/models/concepts.model';
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
    this.backend.addConcepts({
      title: this.enterConcept.value,
      difficulty: 3,
      status: 0,
      relatedConcepts:[],
      relatedNotes:[],
      milestones:[],
      lastRecalled: new Date().toDateString()
    } as IConcept)
    this.enterConcept.reset();
  }

  enterSubmit(event:any) {
    if (event.keyCode === 13) {
      this.backend.addConcepts({
        title: this.enterConcept.value,
        difficulty: 3,
        status: 0,
        relatedConcepts:[],
        relatedNotes:[],
        milestones:[],
        lastRecalled: new Date().toDateString()
      } as IConcept)
      this.enterConcept.reset();
     
    }
  }

}
