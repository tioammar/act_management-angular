import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from '../model/response/user-response';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { LoginResponse } from '../model/response/login-response';
import { LoginForm } from '../model/form/login-form';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  private handlingError(error: HttpErrorResponse): ErrorObservable {
    let message: string;
    if(error.error instanceof ErrorEvent){
      message = "Error: " + error.error.message;
    } else {
      message = "Backend Status Error: " + error.status;
    }
    return new ErrorObservable(message);
  }

  getUsers(): Observable<HttpResponse<UserResponse>> {
    return this.http.get<UserResponse>("http://localhost/todolist/api/get.php?p=allusers", {observe: 'response'})
      .pipe(catchError(this.handlingError));
  }

  login(form: LoginForm): Observable<HttpResponse<LoginResponse>> {
    let params = new HttpParams()
      .append('nik', form.nik)
      .append('password', form.password);
    return this.http.post<LoginResponse>('http://localhost/todolist/api/post.php?p=login', 
      params, {observe: 'response'})
        .pipe(catchError(this.handlingError));
  }
}
