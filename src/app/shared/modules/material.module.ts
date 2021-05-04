import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';

import {MatFormFieldDefaultOptions, MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';

import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatTooltipModule} from '@angular/material/tooltip';
import {MatChipsModule} from '@angular/material/chips';

import {FlexLayoutModule, BREAKPOINT} from '@angular/flex-layout';

import { NgxSpinnerModule } from "ngx-spinner";

const appearance: MatFormFieldDefaultOptions = {
    appearance: 'outline'
  };
  
const modules = [        
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSortModule,
    DragDropModule,
    MatSnackBarModule, 
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatToolbarModule,
    MatSelectModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxSpinnerModule,
    MatAutocompleteModule
]

@NgModule({
    declarations:[],
    imports:modules,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers:[
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: appearance
          }
    ],
    exports: modules
})
export class MaterialModule {
    
}