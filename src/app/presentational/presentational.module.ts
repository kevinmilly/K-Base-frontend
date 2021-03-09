import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { GraphComponent } from './graph/graph.component';
import { KanbanComponent } from './kanban/kanban.component';
import { TableComponent } from './table/table.component';



@NgModule({
  declarations: [GraphComponent,KanbanComponent,TableComponent], 
  imports: [
    SharedModule
  ],
  exports:[
    GraphComponent,KanbanComponent,TableComponent
  ]
})
export class PresentationalModule { }
