import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IConcept } from '../models/concepts.model';
import { INote } from '../models/note.model';
import { IResource } from '../models/resource.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  

  private conceptsUpdated:BehaviorSubject<IConcept[]> = new BehaviorSubject<IConcept[]>([]);
  public concepts$:Observable<IConcept[]> = this.conceptsUpdated.asObservable();

  private notesUpdated:BehaviorSubject<INote[]> = new BehaviorSubject<INote[]>([]);
  private notes$:Observable<INote[]> = this.notesUpdated.asObservable();

  private resourcesUpdated:BehaviorSubject<IResource[]> = new BehaviorSubject<IResource[]>([]);
  public resources$:Observable<IResource[]> = this.resourcesUpdated.asObservable();

  private concepts:IConcept[] = [];
  private notes:INote[] = [];
  private resources:IResource[] = [];

  constructor(private http:HttpClient) { }



  /*NoteS*/

  addNotes(t:INote) {
    this.http.post<{m: string}>('http://localhost:3000/api/notes', t)
      .subscribe((response) => {
        this.notes.push(t);
        this.notesUpdated.next([...this.notes]);
      })
  }

  getNotesByConcept(relatedConcept?:string) {
    return this.http.get<{message:string,notes:INote[]}>(`http://localhost:3000/api/notes/${relatedConcept}`);
  }

  editNotes(note:INote) {
    this.http.put<{note:INote}>(`http://localhost:3000/api/notes/${note._id}`, note);
  }



  /*CONCEPTS*/

  addConcepts(c:IConcept) {
    this.http.post<{m: string}>('http://localhost:3000/api/concepts', c)
      .subscribe((response) => {
        this.concepts.push(c);
        this.conceptsUpdated.next([...this.concepts]);
      })
  }

  getConcepts() {
    // this.http.get<{m:string,c:IConcept[]}>('http://localhost:3000/api/concepts')
    //   .subscribe((data) => {
    //     this.concepts = data.c;
    //   });
    return this.http.get<{message:string,concepts:IConcept[]}>('http://localhost:3000/api/concepts');
  }

  editConcept(concept:IConcept) {
    this.http.put<{concept:IConcept}>(`http://localhost:3000/api/concepts/${concept._id}`, concept);
  }

  deleteConcept(concept:IConcept) {
    this.http.delete(`http://localhost:3000/api/concepts/${concept._id}`);
  }

   /*RESOURCES*/

   getResources(concept:IConcept) {
    return this.http.get<{message:string,resources:IResource[]}>('http://localhost:3000/api/resources');
   }

   editResource(resource:IResource) {
      this.http.put<{resource:IResource}>(`http://localhost:3000/api/resources/${resource._id}`, resource);
    }

    addResources(r:IResource) {
      this.http.post<{m: string}>('http://localhost:3000/api/resources', r)
        .subscribe((response) => {
          this.resources.push(r);
          this.resourcesUpdated.next([...this.resources]);
        })
    }

  
}
