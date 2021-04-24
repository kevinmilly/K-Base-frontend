import { NgModule } from '@angular/core';

import { ConceptsRoutingModule } from './concepts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ConceptsComponent } from './concepts.component';
import { ConceptDetailComponent } from './concept-detail/concept-detail.component';
import { NotesDisplayComponent } from './notes-display/notes-display.component';
import { ResourceCurateDisplayComponent } from './resource-curate-display/resource-curate-display.component';


@NgModule({
  declarations: [ConceptsComponent, ConceptDetailComponent, NotesDisplayComponent, ResourceCurateDisplayComponent],
  imports: [
    ConceptsRoutingModule,
    SharedModule
  ],
  entryComponents:[
    ConceptDetailComponent,
    ResourceCurateDisplayComponent
  ]
})
export class ConceptsModule { }
