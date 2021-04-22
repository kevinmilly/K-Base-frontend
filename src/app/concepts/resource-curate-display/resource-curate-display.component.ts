import { Component, Inject, OnInit } from '@angular/core';
import { BackendService } from 'src/app/core/services/backend.service';

import {IResource} from '../../core/models/resource.model';
import {ISearchResult} from '../../core/models/search-result.model';

import { SubSink } from 'subsink';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IConcept } from 'src/app/core/models/concepts.model';
import { LearningService } from 'src/app/core/services/learning.service';
import { FormControl, Validators } from '@angular/forms';
import { debounce, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { NgxSpinnerService } from 'ngx-spinner';
import { AbstractExtendedWebDriver } from 'protractor/built/browser';
import { throwError } from 'rxjs';

@Component({
  selector: 'kb-resource-curate-display',
  templateUrl: './resource-curate-display.component.html',
  styleUrls: ['./resource-curate-display.component.scss']
})
export class ResourceCurateDisplayComponent implements OnInit {

  private subs = new SubSink();

  concept:IConcept = {} as IConcept;

  prospectResources:ISearchResult[] = [];
  currentResources:IResource[] = [];
  originalResources:IResource[] = [];
  resourcesToAdd:IResource[] = [];
  resourcesToDelete:IResource[] = [];

  searchControl:FormControl = new FormControl('',[Validators.required]);
  searchTerm:string = '';

  levels:string[] =    [
    "Nincompoop",
    "Beginner",
    "Intermediate",
    "Expert",
    "1%"
  ]

  necessities:string[] =    [
    "Frivolous",
    "Somewhat Useful",
    "Very Useful",
    "Need to Know"
  ]


  constructor(
    private backendService: BackendService,
    private learningService: LearningService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef: MatDialogRef<ResourceCurateDisplayComponent>,
    private spinner: NgxSpinnerService
    
  ) {
    console.dir(this.data);
    this.concept = this.data.concept;
   }

  ngOnInit(): void {
    switch (this.concept.level) {
      case 0 || 1:
        this.searchTerm = `Beginning ${this.concept.title}`;
        break;
      case 2 || 3:
      this.searchTerm = `Intermediate ${this.concept.title}`;
        break;
      case 4 || 5:
        this.searchTerm = `Advanced ${this.concept.title}`;
        break;
      default:
        this.searchTerm = `Beginning ${this.concept.title}`;
        break;
    }

    this.spinner.show();

    this.subs.sink = this.searchControl.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
      )
     .subscribe(value => {
       this.searchTerm = value
       this.learningService.getSearchResources(this.searchTerm);
    });

    this.subs.sink = this.backendService.getResources(this.concept)
                        .subscribe(resourceData => {
                          this.currentResources = resourceData.resources;
                          this.originalResources = [...this.currentResources];
                        });

    this.learningService.getSearchResources(this.searchTerm);
    this.subs.sink =  this.learningService.resultObs 
                            .subscribe((results:ISearchResult[]) => {
                              console.log({results});
                              this.prospectResources = results;

                              setTimeout(() => {
                                /** spinner ends after 5 seconds */
                                this.spinner.hide();
                              }, 1000);
                       });
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
        this.searchOrignal(event.container);
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex); 
    
    }
    console.dir(this.currentResources);
  }


  searchOrignal(currentStack:any) {
    if(currentStack.id === 'cdk-drop-list-5') { //if we moved it in the current stack
      /*if it's in the delete stack that means it was moved from the original
      just checking if it's in there allows us to see that it doesn't need to be added to the
      resourcesToAdd array and we don't have to track the original state of the currentResources
      */
      const resourceMarkedForDeletionIdx = this.resourcesToDelete.findIndex(r => r._id === currentStack.data._id)
      if(resourceMarkedForDeletionIdx === -1) { //wasn't part of the original
        this.resourcesToAdd.push({
          title: currentStack.data.title,
          link: currentStack.data.link,
          level: this.concept.level,
          concept: this.concept._id,
        } as IResource)
      } else {
          this.resourcesToDelete.splice(resourceMarkedForDeletionIdx,1);
      }
   
    } else {
        const resourceMarkedForAddIdx = this.resourcesToAdd.findIndex(r => r._id === currentStack.data._id);
        if(resourceMarkedForAddIdx === -1) { //was part of the original
          this.resourcesToDelete.push({
            title: currentStack.data.title,
            link: currentStack.data.link,
            level: this.concept.level,
            concept: this.concept._id,
          } as IResource)

        } else {
          this.resourcesToAdd.splice(resourceMarkedForAddIdx,1);
         }
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
