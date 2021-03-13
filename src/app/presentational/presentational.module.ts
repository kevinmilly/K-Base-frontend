import { NgModule } from '@angular/core';
import { GraphComponent } from './graph/graph.component';
import { KanbanComponent } from './kanban/kanban.component';




@NgModule({
  declarations: [GraphComponent,KanbanComponent],
  imports: [
  ],
  exports:[
    GraphComponent,KanbanComponent
  ]
})
export class PresentationalModule { }
