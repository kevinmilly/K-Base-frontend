import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { GraphComponent } from './graph/graph.component';
import { KanbanComponent } from './kanban/kanban.component';




@NgModule({
  declarations: [GraphComponent,KanbanComponent],
  imports: [
    SharedModule
  ],
  exports:[
    GraphComponent,KanbanComponent
  ]
})
export class PresentationalModule { }
