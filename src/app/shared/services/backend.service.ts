import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IConcept } from '../models/concepts.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private conceptsUpdated:BehaviorSubject<IConcept[]> = new BehaviorSubject<IConcept[]>([]);
  public concepts$:Observable<IConcept[]> = this.conceptsUpdated.asObservable();

  private concepts:IConcept[] = [];

  constructor(private http:HttpClient) { }

  getConcepts() {
    this.http.get<{m:string,c:IConcept[]}>('http://localhost:3000/api/concepts')
      .subscribe((data) => {
        this.concepts = data.c;
        this.conceptsUpdated.next(this.concepts);

      });
  }

  getNotes() {
    
  }

  getMilestones() {
    
  }

  getTasks() {
    
  }

  getResources() {
    
  }


  /*POSTS*/

  addConcepts(c:IConcept) {
    this.http.post<{m: string}>('http://localhost:3000/api/concepts', c)
      .subscribe((response) => {
        this.concepts.push(c);
        this.conceptsUpdated.next([...this.concepts]);
      })
  }




  /*DELETE*/

  
}
