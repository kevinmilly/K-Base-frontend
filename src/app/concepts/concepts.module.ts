import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConceptsRoutingModule } from './concepts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ConceptsComponent } from './concepts.component';


@NgModule({
  declarations: [ConceptsComponent],
  imports: [
    CommonModule,
    ConceptsRoutingModule,
    SharedModule
  ]
})
export class ConceptsModule { }
