import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError, Subscription, BehaviorSubject } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ISearchResult } from '../models/search-result.model';
import { Concept } from '../models/concepts.model';
import { INote } from '../models/note.model';
import { AuthService } from './auth.service';


const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};




@Injectable({
  providedIn: 'root'
})
export class LearningService {

  results: ISearchResult[] = [];
  private resultSubject: BehaviorSubject<ISearchResult[]> = new BehaviorSubject<ISearchResult[]>([]);
  resultObs: Observable<ISearchResult[]> = this.resultSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {

  }

  errorHandler(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error.message);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }

    return throwError(`Something happened...long story short there is a problem with the service`)
  }


  getSearchResources(term: string) {
    this.http.get<ISearchResult[]>(`http://localhost:3000/api/g-search/${term}`)
      .subscribe(results => this.resultSubject.next(results));
  }





}
