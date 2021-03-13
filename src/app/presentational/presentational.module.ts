import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { GraphComponent } from './graph/graph.component';
import { KanbanComponent } from './kanban/kanban.component';




@NgModule({
<<<<<<< HEAD
  declarations: [GraphComponent,KanbanComponent],
=======
  declarations: [GraphComponent,KanbanComponent,TableComponent], 
>>>>>>> 42d81fb57986b306e8b0035988d1752653fdb6e5
  imports: [
    SharedModule
  ],
  exports:[
    GraphComponent,KanbanComponent
  ]
})
export class PresentationalModule { }
