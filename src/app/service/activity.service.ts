import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AllResponse } from '../model/response/all-response';
import { DetailResponse } from '../model/response/detail-response';
import { StatusResponse } from '../model/response/status-response';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { retry, catchError } from 'rxjs/operators';
import { Activity } from '../model/activity';
import { MainForm } from '../model/form/main-form';
import { URLSearchParams } from 'url';
import { ProgressForm } from '../model/form/progress-form';

@Injectable()
export class ActivityService {

  constructor(private http: HttpClient) { }

  private url = "http://localhost/todolist/api/get.php?p=all";
  
  private handlingError(error: HttpErrorResponse): ErrorObservable {
    let message: string;
    if(error.error instanceof ErrorEvent){
      message = "Error: " + error.error.message;
    } else {
      message = "Backend Status Error: " + error.status;
    }
    return new ErrorObservable(message);
  }

  public getActivities(): Observable<HttpResponse<AllResponse>> {
    return this.http.get<AllResponse>(this.url, {observe: 'response'})
    .pipe(
      retry(3),
      catchError(this.handlingError)
    );
  }

  public getActivity(id): Observable<HttpResponse<DetailResponse>> {
    const url = `http://localhost/todolist/api/get.php?p=sin&id=${id}`;
    return this.http.get<DetailResponse>(url, {observe: 'response'})
      .pipe(
        retry(3),
        catchError(this.handlingError)
      );
  }

  public deleteActivity(id): Observable<HttpResponse<StatusResponse>> {
    let params = new HttpParams().append('id', id);
    const url = `http://localhost/todolist/api/post.php?p=delete`;
    return this.http.post<StatusResponse>(url, params, {observe: 'response'})
    .pipe(catchError(this.handlingError));
  }

  public changeStatus(status: string, id): Observable<HttpResponse<StatusResponse>> {
    let params = new HttpParams().append('status', status);
    const url = `http://localhost/todolist/api/post.php?p=stat&id=${id}`;
    return this.http.post<StatusResponse>(url, params, {observe: 'response'})
    .pipe(catchError(this.handlingError));
  }

  private buildBody(form: MainForm): HttpParams {
    return new HttpParams()
    .append('activity', form.activity)
    .append('deadline', form.deadline)
    .append('pic', JSON.stringify(form.pic))
    .append('note', form.note)
    .append('subunit', form.subunit);
  }

  public editActivity(id, form: MainForm): Observable<HttpResponse<StatusResponse>> {
    return this.http.post<StatusResponse>(`http://localhost/todolist/api/post.php?p=update&id=${id}`, 
      this.buildBody(form), {observe: 'response'}).pipe(
      catchError(this.handlingError)
    );
  }

  public addActivity(form: MainForm): Observable<HttpResponse<StatusResponse>> {
    return this.http.post<StatusResponse>('http://localhost/todolist/api/post.php?p=add', 
      this.buildBody(form), {observe: 'response'}).pipe(
      catchError(this.handlingError)
    );
  }
}