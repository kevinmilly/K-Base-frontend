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

@Component({
  selector: 'kb-resource-curate-display',
  templateUrl: './resource-curate-display.component.html',
  styleUrls: ['./resource-curate-display.component.scss']
})
export class ResourceCurateDisplayComponent implements OnInit {

  private subs = new SubSink();

  concept:IConcept = {} as IConcept;

  prospectResources:ISearchResult[] = [];
  currentResources:IResource[] =[];

  searchControl:FormControl = new FormControl('',[Validators.required]);
  searchTerm:string = '';


  constructor(
    private backendService: BackendService,
    private learningService: LearningService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef: MatDialogRef<ResourceCurateDisplayComponent>
    
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
                        .subscribe(resourceData => this.currentResources = resourceData.resources);

    this.learningService.getSearchResources(this.searchTerm);
    this.subs.sink =  this.learningService.resultObs 
                            .subscribe((results:ISearchResult[]) => {
                              console.log({results});
                              this.prospectResources = results;
                       });
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
        transferArrayItem(event.previousContainer.data,
                          event.container.data,
                          event.previousIndex,
                          event.currentIndex);
        console.dir(event.container.data);
        this.backendService.addResources({
          title: event.container.data.title,
          link: event.container.data.link,
          level: this.concept.level,
          concept: this.concept._id,
        } as IResource)
    
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
