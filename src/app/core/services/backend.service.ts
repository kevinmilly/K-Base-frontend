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
  
  private  BASE_URL:string = `http://localhost:3000`;

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

  addNotes(t:INote) {
    this.http.post<{m: string}>(`${this.BASE_URL}/api/notes`, t)
      .subscribe((response) => {
        this.notes.push(t);
        this.notesUpdated.next([...this.notes]);
      })
  }

  getNotesByConcept(relatedConcept?:string) {
    return this.http.get<{message:string,notes:INote[]}>(`${this.BASE_URL}/api/notes/${relatedConcept}`);
  }

  editNotes(note:INote) {
    this.http.put<{note:INote}>(`${this.BASE_URL}/api/notes/${note._id}`, note);
  }



  /*CONCEPTS*/

  addConcepts(c:IConcept) {
    console.log("add Concept on the front end");
    console.log({c});
    this.http.post<{m: string}>(`${this.BASE_URL}/api/concepts`, c)
      .subscribe((response) => {
        console.log({response})
        this.concepts.push(c);
        this.conceptsUpdated.next([...this.concepts]);
      })
  }

  getConcepts() {
     this.http.get<{message:string,concepts:IConcept[]}>(`${this.BASE_URL}/api/concepts`)
      .subscribe( c => this.conceptsUpdated.next(c.concepts))
  }

  editConcept(concept:IConcept) {
    this.http.put<{concept:IConcept}>(`${this.BASE_URL}/api/concepts/${concept._id}`, concept);
  }

  deleteConcept(concept:IConcept) {

    this.http.delete<{concept:IConcept}>(`${this.BASE_URL}/api/concepts/${concept._id}`)
      .subscribe(r => console.log({r}));
  }

   /*RESOURCES*/

   getResources(concept:IConcept) {
    return this.http.get<{message:string,resources:IResource[]}>(`${this.BASE_URL}/api/resources/${concept._id}`);
   }

   editResources(resource:IResource) {
      this.http.put<{resource:IResource}>(`${this.BASE_URL}/api/resources/${resource._id}`, resource)
        .subscribe(r => console.log({r}));
    }

    addResources(r:IResource) {
      this.http.post<{m: string}>(`${this.BASE_URL}/api/resources`, r)
        .subscribe((response) => {
          this.resources.push(r);
          this.resourcesUpdated.next([...this.resources]);
        })
    }

  
}
