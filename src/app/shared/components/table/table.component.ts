import {AfterViewInit, Component, ViewChild, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
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
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

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
    },
    {
      icon:'restart_alt',
      cat:'Reset'
    }
  ]


  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private backend:BackendService
  ) {
   }

  ngOnInit(): void {    
   
    this.displayedColumns = this.displayNames;
    this.columns = this.columns.filter(c => c !== "_id");
    this.dataSaved = [...this.data];
  }

  ngAfterViewInit() {
    this.resetTableAndFilter(this.data);
  }

  ngOnChanges(): void {
    this.resetTableAndFilter(this.data);
  }

  resetTableAndFilter(data:IConcept[]) {
    this.dataSource = new MatTableDataSource([...data]);
    this.setupSortAndPagination();
      

  }

  applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  onFilter(filterType:string, filterChoice:string) {
    this.data = this.dataSaved.filter(d => d[`${filterType}`] === filterChoice );
    this.resetTableAndFilter(this.data);
  }

  onClicked(type:string,event:any) {
    if(type==='zoom') {
      this.rowClick(event);
    } else if(type==='delete') {
       if(confirm("Are you sure you wanted to delete this concept?")) {
         this.onDelete.emit(event);
       }
    }
  }

  setupSortAndPagination() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  } 

  rowClick(event:IConcept) {
    const dialogRef = this.dialog.open(ConceptDetailComponent, {
      width: '40rem',
      height: '45rem',
      data: {
        concept:event,
        notes$:this.backend.getNotesByConcept(event._id)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    
      if(result.action === 'update') {
        if (result.type === 'concept') {
          this.backend.editConcept(result.event as IConcept);
        } else { //note
           this.backend.editNotes(result.event as INote);
        }
      } else { //add
        if (result.type === 'concept') {
          this.backend.addConcepts(result.event as IConcept);
        } else { //note
            this.backend.addNote(result.event as INote);
        }
      }

    });
  }

  categoryFilter(category:any) {

    switch (category.cat) {
      case "Bible":
        this.data = this.dataSaved.filter(d => d.tag === "Bible");
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
        case "Reset":
          this.data = [...this.dataSaved];
    }
    this.resetTableAndFilter(this.data);

  }


}
