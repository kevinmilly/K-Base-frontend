import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError, Subscription } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { IResource } from '../models/resource.model';
import { IConcept } from '../models/concepts.model';
import { INote } from '../models/note.model';


const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};


@Injectable({
  providedIn: 'root'
})
export class LearningService {

  videos:IResource[] = [];

  constructor(private http:HttpClient) { }







  errorHandler(errorResponse: HttpErrorResponse) {
    if(errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error.message);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }

    return throwError(`Something happened...long story short there is a problem with the service`)
  }


  getSearchResources(concept:IConcept) {
    switch (concept.level) {
      case 0 || 1:
        
        return this.http.get<IResource[]>(`http://localhost:3000/api/g-search/${concept.title}`);
      
      case 2 || 3:
      
        return this.http.get<IResource[]>(`http://localhost:3000/api/g-search/${concept.title}`);

      case 4 || 5:
      
        return this.http.get<IResource[]>(`http://localhost:3000/api/g-search/${concept.title}`);

      default:
        return this.http.get<IResource[]>(`http://localhost:3000/api/g-search/${concept.title}`);
    
    }
  }


}
