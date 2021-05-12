import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IConcept } from '../models/concepts.model';
import { INote } from '../models/note.model';
import { IResource } from '../models/resource.model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  
  private  BASE_URL:string = environment.apiUrl;

  private conceptsUpdated:BehaviorSubject<IConcept[]> = new BehaviorSubject<any>([]);
  public readonly concepts$:Observable<IConcept[]> = this.conceptsUpdated.asObservable();
  

  private notesUpdated:BehaviorSubject<INote[]> = new BehaviorSubject<INote[]>([]);
  public readonly notes$:Observable<INote[]> = this.notesUpdated.asObservable();

  private resourcesUpdated:BehaviorSubject<IResource[]> = new BehaviorSubject<IResource[]>([]);
  public  readonly resources$:Observable<IResource[]> = this.resourcesUpdated.asObservable();

  private concepts:IConcept[] = [];
  private notes:INote[] = [];
  private resources:IResource[] = [];

  constructor(private http:HttpClient) { }



  /*NoteS*/

  addNote(t:INote) {
    this.http.post<{m: string}>(`${this.BASE_URL}/api/notes`, t)
      .subscribe((response) => {
        this.notes.push(t);
        this.notesUpdated.next([...this.notes]);
      })
  }

  getNotesByConcept(relatedConcept?:string) {
   this.http.get<{message:string,notes:INote[]}>(`${this.BASE_URL}/api/notes/${relatedConcept}`)
            .subscribe( c => {
              this.notes = c.notes;
              this.notesUpdated.next(this.notes);
          })
  }

  editNotes(note:INote) {
    this.http.put<{note:INote}>(`${this.BASE_URL}/api/notes/${note._id}`, note)
    .subscribe(r => {
      this.notesUpdated.next(
        this.notes.splice(
          this.notes.findIndex(c => c._id === note._id), 
          1, 
          r.note
      ))
    })
  }

  deleteNote(relatedConcept?:string) {

    this.http.delete<{note:INote}>(`${this.BASE_URL}/api/notes/${relatedConcept}`)
      .subscribe(r => {
        this.notes = this.notes.filter(n => n.relatedConcept !== relatedConcept);
        this.notesUpdated.next([...this.notes]);
      });
  }



  /*CONCEPTS*/

  addConcepts(c:IConcept) {
    this.http.post<IConcept>(`${this.BASE_URL}/api/concepts`, c)
      .subscribe((response) => {
        this.conceptsUpdated.next([...this.concepts]);
      })
  }

  getConcepts() {
     this.http.get<{message:string,concepts:IConcept[]}>(`${this.BASE_URL}/api/concepts`)
      .subscribe( c => {
        this.concepts = c.concepts;
        this.conceptsUpdated.next([...this.concepts]);
    })
  }

  editConcept(concept:IConcept) {

    this.http.put<{concept:IConcept}>(`${this.BASE_URL}/api/concepts/${concept._id}`, concept)
           .subscribe(r => {
      
            this.concepts.splice(
              this.concepts.findIndex(c => c._id === concept._id), 
              1, 
              r.concept
          )
            this.conceptsUpdated.next([...this.concepts]);
          })
  }

  deleteConcept(concept:IConcept) {

    this.http.delete<{concept:IConcept}>(`${this.BASE_URL}/api/concepts/${concept._id}`)
      .subscribe(r => {
        this.concepts = this.concepts.filter(c => c._id !== concept._id);

        this.deleteNote(concept._id)

        this.conceptsUpdated.next([...this.concepts]);
      });
  }

   /*RESOURCES*/

   getResources(concept:IConcept) {
    this.http.get<{message:string,resources:IResource[]}>(`${this.BASE_URL}/api/resources/${concept._id}`)
    .subscribe( c => {
      this.resources = c.resources;

      this.resourcesUpdated.next([...this.resources]);
  })
   }

   editResources(resource:IResource) {
      this.http.put<{resource:IResource}>(`${this.BASE_URL}/api/resources/${resource._id}`, resource)
        .subscribe(r => console.log({r}));
    }

    addResources(resourcesToAdd:IResource[]) {
      this.http.post<{m: string}>(`${this.BASE_URL}/api/resources`, resourcesToAdd)
        .subscribe((response) => {
          this.resources = [...this.resources, ...resourcesToAdd];
          this.resourcesUpdated.next([...this.resources]);
        })
    }

    deleteResources(resourcesToDelete:any[]) {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        body: resourcesToDelete
      }
      return this.http.delete<{concept:IConcept}>(`${this.BASE_URL}/api/resources`, options)
      .subscribe(r => {
        const updatedResources = this.resources.filter(resource => !resourcesToDelete.includes(resource._id));
        this.resourcesUpdated.next(updatedResources);
     
      });
    }

  
}
