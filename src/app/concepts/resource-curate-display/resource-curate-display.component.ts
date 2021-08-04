import { Component, Inject, OnInit } from '@angular/core';
import { BackendService } from 'src/app/core/services/backend.service';

import { SubSink } from 'subsink';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { LearningService } from 'src/app/core/services/learning.service';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgxSpinnerService } from 'ngx-spinner';

import { combineLatest } from 'rxjs';
import { Level, Necessity } from 'src/app/core/models/enums/factors.enum';
import { Concept } from 'src/app/core/models/interfaces/concepts.model';
import { Resource } from 'src/app/core/models/interfaces/resource.model';
import { SearchResult } from 'src/app/core/models/interfaces/search-result.model';
import { ChoiceValue } from 'src/app/core/models/interfaces/choiceValue.model';

@Component({
  selector: 'kb-resource-curate-display',
  templateUrl: './resource-curate-display.component.html',
  styleUrls: ['./resource-curate-display.component.scss']
})
export class ResourceCurateDisplayComponent implements OnInit {

  private subs = new SubSink();

  concept: Concept = {} as Concept;

  prospectResources: SearchResult[];
  currentResources: Resource[];
  originalResources: Resource[];
  resourcesToAdd: Resource[];
  resourcesToDelete: Resource[];

  searchControl: FormControl;
  searchTerm: string;

  necessityChoices:ChoiceValue[];
  levelChoices:ChoiceValue[];


  constructor(
    private backendService: BackendService,
    private learningService: LearningService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ResourceCurateDisplayComponent>,
    private spinner: NgxSpinnerService

  ) {

      this.prospectResources = [];
      this.currentResources = [];
      this.originalResources = [];
      this.resourcesToAdd = [];
      this.resourcesToDelete = [];

      this.searchControl =  new FormControl('', [Validators.required]);
      this.searchTerm  = '';

      this.concept = this.data.concept;

      this.necessityChoices = [
        { name: Necessity[0], value: 0 },
        { name: Necessity[1], value: 1 }, 
        { name: Necessity[2], value: 2 },
        { name: Necessity[3], value: 3 }
      ]
      this.levelChoices = [
        { name: Level[0], value: 0 },
        { name: Level[1], value: 1 },
        { name: Level[2], value: 2 },
        { name: Level[3], value: 3 },
        { name: Level[4], value: 4 }
      ]
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

    //for search new prospective resources
    this.subs.sink = this.searchControl.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
      )
      .subscribe(value => {
        this.searchTerm = value
        this.learningService.getSearchResources(this.searchTerm);
      });

    this.learningService.getSearchResources(this.searchTerm);
    this.backendService.getResources(this.concept);
    //only include amoung the prospect resources ones not in the current
    combineLatest([
      this.backendService.resources$,
      this.learningService.resultObs
    ])
      .pipe(
        tap(([original, prospect]) => {
          return (
            original.forEach(o => {
              const idx = prospect.findIndex(p => p.link === o.link)
              if (idx !== -1) prospect.splice(idx, 1);
            })
          )
        }),
      )
      .subscribe(([curr, changedProspective]) => {
        this.currentResources = curr;
        this.prospectResources = changedProspective;

        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
      })
  }

  drop(event: CdkDragDrop<any>, stack: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      this.searchOriginal(event.container, event.currentIndex, stack);

    }

  }


  searchOriginal(currentStack: any, index: number, droppedStackName: string) {
    if (droppedStackName === 'save') { //if we moved it in the current stack
      /*if it's in the delete stack that means it was moved from the original
      just checking if it's in there allows us to see that it doesn't need to be added to the
      resourcesToAdd array and we don't have to track the original state of the currentResources
      */
      const resourceMarkedForDeletionIdx = this.resourcesToDelete.findIndex(r => r._id === currentStack.data._id);
      if (resourceMarkedForDeletionIdx === -1) { //wasn't part of the original
        const latestResourceAdded = currentStack.data[currentStack.data.length - 1];
        this.resourcesToAdd.push({
          title: latestResourceAdded.title,
          link: latestResourceAdded.link,
          level: this.concept.level,
          concept: this.concept._id,
        } as Resource)

      } else {
        this.resourcesToDelete.splice(resourceMarkedForDeletionIdx, 1);
      }

    } else {
      const resourceMarkedForAddIdx = this.resourcesToAdd.findIndex(r => r._id === currentStack.data[index]._id);
      if (resourceMarkedForAddIdx === -1) { //was part of the original
        this.resourcesToDelete.push({
          _id: currentStack.data[index]._id,
          title: currentStack.data[index].title,
          link: currentStack.data[index].link,
          level: this.concept.level,
          concept: this.concept._id,
        } as Resource)
      } else {
        this.resourcesToAdd.splice(resourceMarkedForAddIdx, 1);
      }
    }
  }

  save() {
    this.dialogRef.close({
      delete: this.resourcesToDelete.map(resource => resource._id),
      add: this.resourcesToAdd
    })
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
