import { AfterViewInit, Component, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConceptDetailComponent } from 'src/app/concepts/concept-detail/concept-detail.component';
import { BackendService } from 'src/app/core/services/backend.service';
import { Concept } from 'src/app/core/models/concepts.model';
import { INote } from 'src/app/core/models/note.model';
import { Tag } from 'src/app/core/models/enums/factors.enum';

@Component({
  selector: 'kb-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() data: any[] = [];
  @Input() columns: string[] = [];
  @Input() filterChoices: string[][] = []; //options the below filters can be, order of this filter Choices array based on order of filters array
  @Input() filters: string[] = []; //different things you can filter by
  @Input() displayNames: string[] = [];
  @Input() action = false;
  @Input() actionButtonIcon: string = 'zoom_in';
  @Input() deleteable: boolean = true;
  @Input() secondaryButtonIcon: string = 'delete_forever';

  @Output() onDelete = new EventEmitter();
  @Output() onZoom = new EventEmitter();

  dataSaved: any[] = [];


  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource;
  refColumns: string[] = []

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  categories: any[] = [
    {
      icon: 'book',
      cat: Tag[0]
    },
    {
      icon: 'keyboard',
      cat: Tag[1]
    },
    {
      icon: 'translate',
      cat: Tag[2]
    },
    {
      icon: 'psychology',
      cat: Tag[3]
    },
    {
      icon: 'restart_alt',
      cat: 'Reset'
    }
  ]


  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private backend: BackendService
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

  resetTableAndFilter(data: Concept[]) {
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

  onFilter(filterType: string, filterChoice: string) {
    this.data = this.dataSaved.filter(d => d[`${filterType}`] === filterChoice);
    this.resetTableAndFilter(this.data);
  }

  onClicked(type: string, event: any) {
    if (type === 'zoom') {
      this.rowClick(event);
    } else if (type === 'delete') {
      if (confirm("Are you sure you wanted to delete this concept?")) {
        this.onDelete.emit(event);
      }
    }
  }

  setupSortAndPagination() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  rowClick(event: Concept) {
    const dialogRef = this.dialog.open(ConceptDetailComponent, {
      width: '90%',
      height: '45rem',
      data: {
        concept: event,
        notes$: this.backend.getNotesByConcept(event._id)
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.action === 'update') {
        if (result.type === 'concept') {
          this.backend.editConcept(result.event as Concept);
        } else { //note
          this.backend.editNotes(result.event as INote);
        }
      } else { //add
        if (result.type === 'concept') {
          this.backend.addConcepts(result.event as Concept);
        } else { //note
          this.backend.addNote(result.event as INote);
        }
      }

    });
  }

  categoryFilter(category: any) {

    switch (category.cat) {
      case Tag[0]:
        this.data = this.dataSaved.filter(d => d.tag === Tag[0]);
        console.log(Tag[0]);
        break;

      case Tag[1]:
        this.data = this.dataSaved.filter(d => d.tag === Tag[1]);
        console.log(Tag[1]);
        break;
      case Tag[2]:
        this.data = this.dataSaved.filter(d => d.tag === Tag[2]);
        console.log(Tag[2]);
        break;
      case Tag[3]:
        this.data = this.dataSaved.filter(d => d.tag === Tag[3]);
        console.log(Tag[3]);
        break;
      case "Reset":
        this.data = [...this.dataSaved];
        console.log("Reset");
    }
    this.resetTableAndFilter(this.data);

  }


}
