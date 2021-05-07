import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { BackendService } from 'src/app/core/services/backend.service';
import { ConceptDetailComponent } from 'src/app/concepts/concept-detail/concept-detail.component';
import { IConcept } from 'src/app/core/models/concepts.model';
import { INote } from 'src/app/core/models/note.model';
import { ResourceCurateDisplayComponent } from 'src/app/concepts/resource-curate-display/resource-curate-display.component';
import { SubSink } from 'subsink';

@Component({
  selector: 'kb-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent {

  @Input() kanbanFilteredDatasets:any = [];
  @Input() labels:string[] = [];
  @Input() headers:string[] = [];
  @Input() translators:string[][] = []; //options the below filters can be, order of this filter Choices array based on order of filters array
  @Input() filters:string[] = []; //different things you can filter by
  @Input() boxDetails:string[] = [];

  @Output() onZoom = new EventEmitter();
  @Output() filterKanban = new EventEmitter();
  
  dragData:[IConcept[]] = [[]];
  dragDataSaved:[IConcept[]] = [[]];

  private subs = new SubSink();

  categories:any[] = [
    {
      icon:'local_library',
      cat:'Level'
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

  currentFilterType:string = 'level';

  constructor(
    public dialog: MatDialog,
    private backend:BackendService
  ) {
    
   } 

  ngOnChanges(): void {
    this.updateFilter(this.currentFilterType);
  }

  drop(event: CdkDragDrop<IConcept[]>, column:number) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
        transferArrayItem(event.previousContainer.data,
                          event.container.data,
                          event.previousIndex,
                          event.currentIndex);
      }
  
      this.updateConcept(event.container.data[event.currentIndex], column);
      
  }

  updateConcept(concept:IConcept, index:number) {
    if(this.currentFilterType === 'level') {
     concept['level'] = index;
      this.backend.editConcept(concept as IConcept);
    } else if(this.currentFilterType === 'necessity') {
       concept['necessity'] = index;
        this.backend.editConcept(concept as IConcept);
    } else { //tag
       concept['tag'] = this.headers[index];
        this.backend.editConcept(concept as IConcept);
    }
  }

  applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onClicked(type:string,event:any) {
    if(type==='zoom') {
      this.rowClick(event);
    } 
  }

  rowClick(event:IConcept) {
    const dialogRef = this.dialog.open(ConceptDetailComponent, {
      width: '30rem',
      height: '45rem',
      data: {
        concept:event,
        tasks$:this.backend.getNotesByConcept(event._id)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.action === 'update') {
        if (result.action === 'concept') {
          this.backend.editConcept(result.event as IConcept);
        } else { //task
           this.backend.editNotes(result.event as INote);
        }
      } else { //add
        if (result.action === 'concept') {
          this.backend.addConcepts(result.event as IConcept);
        } else { //task
            
            this.backend.addNote(result.event as INote);
        }
      }

    });
  }

  updateFilter(event:string) {
    this.filterKanban.emit(event);
    this.currentFilterType = event;
  }



  openResources(concept:IConcept) {
    const dialogResourceRef = this.dialog.open(ResourceCurateDisplayComponent, {
      width: '90%',
      height: '45rem',
      data: {
        concept
      }
    });

    this.subs.sink = dialogResourceRef.afterClosed()
                        .subscribe( result => { 
                          if(result) {
                              if(result.add.length > 0) {
                                this.backend.addResources(result.add);
                              } 
                              if(result.delete[0]) {
                                this.backend.deleteResources(result.delete);
                              }
                          }
                        })
  }

  

}
 