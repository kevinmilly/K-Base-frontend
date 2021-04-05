import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { BackendService } from 'src/app/core/services/backend.service';
import { ConceptDetailComponent } from 'src/app/concepts/concept-detail/concept-detail.component';
import { IConcept } from 'src/app/core/models/concepts.model';
import { INote } from 'src/app/core/models/note.model';
import { ResourceCurateDisplayComponent } from 'src/app/concepts/resource-curate-display/resource-curate-display.component';

@Component({
  selector: 'kb-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {

  @Input() kanbanFilteredDatasets:any = [];
  @Input() labels:string[] = [];
  @Input() translators:string[][] = []; //options the below filters can be, order of this filter Choices array based on order of filters array
  @Input() filters:string[] = []; //different things you can filter by
  @Input() boxDetails:string[] = [];

  @Output() onZoom = new EventEmitter();
  
  dragData:[IConcept[]] = [[]];
  dragDataSaved:[IConcept[]] = [[]];

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
    public dialog: MatDialog,
    private backend:BackendService
  ) {
    
   }

  ngOnInit(): void {
   console.dir(this.translators);

  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
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
          this.backend.editConcept(result as IConcept);
        } else { //task
           this.backend.editNotes(result as INote);
        }
      } else { //add
        if (result.action === 'concept') {
          this.backend.addConcepts(result as IConcept);
        } else { //task
            this.backend.addNotes(result as INote);
        }
      }

    });
  }


  openResources(concept:IConcept) {
    const dialogResourceRef = this.dialog.open(ResourceCurateDisplayComponent, {
      width: '30rem',
      height: '45rem',
      data: {
        concept
      }
    });
  }

  

}
 