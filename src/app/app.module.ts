import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { TableComponent } from './presentational/table/table.component';
import { GraphComponent } from './presentational/graph/graph.component';
import { ButtonComponent } from './presentational/button/button.component';
import { KanbanComponent } from './presentational/kanban/kanban.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ToolbarComponent,
    TableComponent,
    GraphComponent,
    ButtonComponent,
    KanbanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
