import { NgModule } from '@angular/core';
import { GraphComponent } from './graph/graph.component';
import { KanbanComponent } from './kanban/kanban.component';
import { TableComponent } from './table/table.component';



@NgModule({
  declarations: [GraphComponent,KanbanComponent,TableComponent],
  imports: [
  ],
  exports:[
    GraphComponent,KanbanComponent,TableComponent
  ]
})
export class PresentationalModule { }
