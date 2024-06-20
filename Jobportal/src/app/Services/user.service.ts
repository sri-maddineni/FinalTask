import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private createurl = 'https://localhost:7098/api/User';
  private loginurl="https://localhost:7098/api/User/login"

  constructor(private http:HttpClient) { }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.createurl, user)
      .pipe(catchError(this.handleError));
  }

  LoginUser(user:any):Observable<any>{
    return this.http.post<any>(
      this.loginurl,user
    ).pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
