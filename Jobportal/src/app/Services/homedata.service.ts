import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Iemp } from '../Interfaces/HomedataInterface';

@Injectable({
  providedIn: 'root'
})

export class HomedataService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Iemp[]> {
    return this.http.get<Iemp[]>("https://localhost:7098/api/User")
      .pipe(
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: HttpErrorResponse): Observable<never> {
    return throwError(error.message || "Server error");
  }
}
