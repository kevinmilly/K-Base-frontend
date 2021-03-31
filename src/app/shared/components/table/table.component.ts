import {AfterViewInit, Component, ViewChild, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConceptDetailComponent } from 'src/app/concepts/concept-detail/concept-detail.component';
import { BackendService } from 'src/app/core/services/backend.service';
import { IConcept } from 'src/app/core/models/concepts.model';
import { INote } from 'src/app/core/models/note.model';

@Component({
  selector: 'kb-table', 
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'] 
})
export class TableComponent implements OnInit {

  @Input() data:any[] = [];
  @Input() columns:string[] = [];
  @Input() filterChoices:string[][] = []; //options the below filters can be, order of this filter Choices array based on order of filters array
  @Input() filters:string[] = []; //different things you can filter by
  @Input() displayNames:string[] = [];
  @Input() action = false; 
  @Input() actionButtonIcon:string = 'zoom_in';
  @Input() deleteable:boolean = true;
  @Input() secondaryButtonIcon:string ='delete_forever';

  @Output() onDelete = new EventEmitter();
  @Output() onZoom = new EventEmitter();

  dataSaved:any[] = [];


  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource;
  refColumns:string[] = []

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  categories:any[] = [
    {
      icon:'book',
      cat:'Bible'
    },
    {
      icon:'keyboard',
      cat: 'Programming'
    },
    {
      icon:'translate',
      cat: 'Language Studies'
    },
    {
      icon:'psychology',
      cat:'Potpourri'
    }
  ]


  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private backend:BackendService
  ) {
   }

  ngOnInit(): void {    
    console.dir(this.data);
    this.dataSaved = [...this.data];
    this.dataSource = new MatTableDataSource([...this.data]);
    this.setupSortAndPagination();
      
    this.displayedColumns = this.displayNames;
    this.columns = this.columns.filter(c => c !== "_id");
    console.dir(this.columns);

  }

  applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onFilter(filterType:string, filterChoice:string) {
    this.data = this.dataSaved.filter(d => d[`${filterType}`] === filterChoice );
    this.dataSource = new MatTableDataSource(this.data);
    this.setupSortAndPagination();
  }

  onClicked(type:string,event:any) {
    if(type==='zoom') {
      this.rowClick(event);
    } else {
       this.onDelete.emit({event:event});
    }
  }

  setupSortAndPagination() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  rowClick(event:IConcept) {
    const dialogRef = this.dialog.open(ConceptDetailComponent, {
      width: '45rem',
      height: '30rem',
      data: {
        concept:event,
        notes$:this.backend.getNotesByConcept(event._id)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.action === 'update') {
        if (result.action === 'concept') {
          this.backend.editConcept(result as IConcept);
        } else { //note
           this.backend.editNotes(result as INote);
        }
      } else { //add
        if (result.action === 'concept') {
          this.backend.addConcepts(result as IConcept);
        } else { //note
            this.backend.addNotes(result as INote);
        }
      }

    });
  }

  categoryFilter(category:string) {
   
    switch (category) {
      case "Bible":
        this.data = this.dataSaved.filter(d => d.tag === "Bible"  );
        break;
    
       case "Programming":
        this.data = this.dataSaved.filter(d => d.tag === "Programming");
        break;
        case "Language Studies":
          this.data = this.dataSaved.filter(d => d.tag === "Language Studies");
        break;
        case "Potpourri":
          this.data = this.dataSaved.filter(d => "Potpourri");
        break;
    }

    this.dataSource = new MatTableDataSource(this.data);
      this.setupSortAndPagination();

  }


}
