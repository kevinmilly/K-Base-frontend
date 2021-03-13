import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

<<<<<<< HEAD
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';

import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
=======
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';

import {MatListModule} from '@angular/material/list';
>>>>>>> 42d81fb57986b306e8b0035988d1752653fdb6e5

@NgModule({
    declarations:[],
    imports:[
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatSnackBarModule, 
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatTabsModule,
        MatDialogModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
<<<<<<< HEAD
        MatSidenavModule,
        MatGridListModule,
        MatToolbarModule,
        MatSelectModule
=======
        MatToolbarModule,
        MatSidenavModule,
        MatListModule
>>>>>>> 42d81fb57986b306e8b0035988d1752653fdb6e5

    ],
    exports:[
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatSnackBarModule, 
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatTabsModule,
        MatDialogModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
<<<<<<< HEAD
        MatSidenavModule,
        MatGridListModule,
        MatToolbarModule
=======
        MatToolbarModule,
        MatSidenavModule,
        MatListModule
>>>>>>> 42d81fb57986b306e8b0035988d1752653fdb6e5
   
    ]
})
export class MaterialModule {
    
}