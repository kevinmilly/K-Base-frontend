import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConceptsRoutingModule } from './concepts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ConceptsComponent } from './concepts.component';
import { ConceptDetailComponent } from './concept-detail/concept-detail.component';


@NgModule({
  declarations: [ConceptsComponent, ConceptDetailComponent],
  imports: [
    CommonModule,
    ConceptsRoutingModule,
    SharedModule
  ],
  entryComponents:[
    ConceptDetailComponent
  ]
})
export class ConceptsModule { }
