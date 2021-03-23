import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IConcept } from '../models/concepts.model';
import { ITask } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private conceptsUpdated:BehaviorSubject<IConcept[]> = new BehaviorSubject<IConcept[]>([]);
  public concepts$:Observable<IConcept[]> = this.conceptsUpdated.asObservable();

  private concepts:IConcept[] = [];

  constructor(private http:HttpClient) { }



  /*TASKS*/

  getTasks(id?:string) {
    return this.http.get<{message:string,tasks:ITask[]}>(`http://localhost:3000/api/tasks/${id}`);
  }

  editTasks(task:ITask) {
    this.http.put<{task:ITask}>(`http://localhost:3000/api/tasks/${task._id}`, task);
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







  /*NOTES*/

  
  getNotes() {
    
  }
  
}
