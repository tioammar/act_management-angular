import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from '../model/response/user-response';

@Injectable()
export class UserService {

  constructor() { }

  getUsers(): Observable<HttpResponse<UserResponse>> {
    return null;
  }
}
