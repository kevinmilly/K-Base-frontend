import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Concept } from '../models/interfaces/concepts.model';
import { Note } from '../models/interfaces/note.model';
import { Resource } from '../models/interfaces/resource.model';



import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  // private  BASE_URL:string = "http://localhost:3000";
  private BASE_URL: string = "https://afternoon-shore-01719.herokuapp.com";

  private conceptsUpdated: BehaviorSubject<Concept[]> = new BehaviorSubject<any>([]);
  public readonly concepts$: Observable<Concept[]> = this.conceptsUpdated.asObservable();


  private notesUpdated: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);
  public readonly notes$: Observable<Note[]> = this.notesUpdated.asObservable();

  private resourcesUpdated: BehaviorSubject<Resource[]> = new BehaviorSubject<Resource[]>([]);
  public readonly resources$: Observable<Resource[]> = this.resourcesUpdated.asObservable();

  private concepts: Concept[] = [];
  private notes: Note[] = [];
  private resources: Resource[] = [];

  constructor(private http: HttpClient, private authService: AuthService) { }



  /*NoteS*/

  addNote(noteToAdd: Note) {
    this.http.post<{ m: string }>(`${this.BASE_URL}/api/notes`, noteToAdd)
      .subscribe((response) => {
        this.notes.push(noteToAdd);
        this.notesUpdated.next([...this.notes]);
      })
  }

  getNotesByConcept(relatedConcept?: string) {
    this.http.get<{ message: string, notes: Note[] }>(`${this.BASE_URL}/api/notes/${relatedConcept}`)
      .subscribe(c => {
        this.notes = c.notes;
        this.notesUpdated.next(this.notes);
      })
  }
  editNotes(note: Note) {
    this.http.put<{ note: Note }>(`${this.BASE_URL}/api/notes/${note._id}`, note)
      .subscribe(r => {
        this.notesUpdated.next(
          this.notes.splice(
            this.notes.findIndex(c => c._id === note._id),
            1,
            r.note
          ))
      })
  }

  deleteNote(relatedConcept?: string) {

    this.http.delete<{ note: Note }>(`${this.BASE_URL}/api/notes/${relatedConcept}`)
      .subscribe(r => {
        this.notes = this.notes.filter(n => n.relatedConcept !== relatedConcept);
        this.notesUpdated.next([...this.notes]);
      });
  }



  /*CONCEPTS*/

  addConcepts(conceptToAdd: Concept) {
    this.http.post<Concept>(`${this.BASE_URL}/api/concepts`, conceptToAdd)
      .subscribe((response) => {
        this.concepts.push(response);
        this.conceptsUpdated.next([...this.concepts]);
      })
  }

  getConcepts() {
    this.http.get<{ message: string, concepts: Concept[] }>(`${this.BASE_URL}/api/concepts`)
      .subscribe(c => {
        this.concepts = c.concepts;
        this.conceptsUpdated.next([...this.concepts]);
      })
  }

  editConcept(concept: Concept) {

    this.http.put<{ concept: Concept }>(`${this.BASE_URL}/api/concepts/${concept._id}`, concept)
      .subscribe(r => {

        this.concepts.splice(
          this.concepts.findIndex(c => c._id === concept._id),
          1,
          r.concept
        )
        this.conceptsUpdated.next([...this.concepts]);
      })
  }

  deleteConcept(concept: Concept) {

    this.http.delete<{ concept: Concept }>(`${this.BASE_URL}/api/concepts/${concept._id}`)
      .subscribe(r => {
        this.concepts = this.concepts.filter(c => c._id !== concept._id);

        this.conceptsUpdated.next([...this.concepts]);
        this.deleteNote(concept._id);
      });
  }

  /*RESOURCES*/

  getResources(concept: Concept) {
    this.http.get<{ message: string, resources: Resource[] }>(`${this.BASE_URL}/api/resources/${concept._id}`)
      .subscribe(c => {
        this.resources = c.resources;

        this.resourcesUpdated.next([...this.resources]);
      })
  }

  editResources(resource: Resource) {
    this.http.put<{ resource: Resource }>(`${this.BASE_URL}/api/resources/${resource._id}`, resource)
      .subscribe();
  }

  addResources(resourcesToAdd: Resource[]) {
    this.http.post<{ m: string }>(`${this.BASE_URL}/api/resources`, resourcesToAdd)
      .subscribe((response) => {
        this.resources = [...this.resources, ...resourcesToAdd];
        this.resourcesUpdated.next([...this.resources]);
      })
  }

  deleteResources(resourcesToDelete: any[]) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: resourcesToDelete
    }
    this.http.delete<{ concept: Concept }>(`${this.BASE_URL}/api/resources`, options)
      .subscribe(r => {
        const updatedResources = this.resources.filter(resource => !resourcesToDelete.includes(resource._id));
        this.resourcesUpdated.next(updatedResources);

      });
  }


}
