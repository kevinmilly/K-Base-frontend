import { Component, Inject, OnInit } from '@angular/core';
import { BackendService } from 'src/app/core/services/backend.service';

import {IResource} from '../../core/models/resource.model';
import {ISearchResult} from '../../core/models/search-result.model';

import { SubSink } from 'subsink';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IConcept } from 'src/app/core/models/concepts.model';
import { LearningService } from 'src/app/core/services/learning.service';

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

  constructor(
    private backendService: BackendService,
    private learningService: LearningService,
    @Inject(MAT_DIALOG_DATA) public data:IConcept,
    private dialogRef: MatDialogRef<ResourceCurateDisplayComponent>
    
  ) {
    this.concept = this.data;
   }

  ngOnInit(): void {
    this.subs.sink = this.backendService.getResources(this.concept)
                        .subscribe(resourceData => this.currentResources = resourceData.resources);
    this.subs.sink =  this.learningService.getSearchResources(this.concept)
  }

}
