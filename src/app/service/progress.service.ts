import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatusResponse } from '../model/response/status-response';
import { ProgressForm } from '../model/form/progress-form';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ProgressService {

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

  public addProgress(form: ProgressForm): Observable<HttpResponse<StatusResponse>> {
    let params = new HttpParams()
      .append('progress', form.progress)
      .append('pic', form.pic)
      .append('pdate', form.pdate);
    return this.http.post<StatusResponse>('http://localhost/todolist/api/post.php?p=addprog', 
      params, {observe: 'response'}).pipe(catchError(this.handlingError));
  }

  public deleteProgress(id): Observable<HttpResponse<StatusResponse>> {
    let params = new HttpParams().append('id', id);
    return this.http.post<StatusResponse>('http://localhost/todolist/api/post.php?p=delprog', 
      params, {observe: 'response'}).pipe(catchError(this.handlingError));
  }
}
