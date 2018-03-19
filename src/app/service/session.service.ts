import { Inject, Injectable, InjectionToken, Output, EventEmitter } from '@angular/core';
import { StorageService } from 'ngx-webstorage-service';
import { User } from '../model/user';
import { LoginResponse } from '../model/response/login-response';

export const SESSION_TOKEN = new InjectionToken<StorageService>('BPP_TO_DO_LIST');
const LEVEL = "level";
const SUB_UNIT = "subunit";
const NAME = "name";
const NIK = "nik";

@Injectable()
export class SessionService {

  constructor(@Inject(SESSION_TOKEN) private storage: StorageService) { }

  private isLoggedIn = false;
  @Output() change: EventEmitter<boolean> = new EventEmitter();

  setAll(user: LoginResponse): void {
    this.storage.set(NAME, user.name);
    this.storage.set(LEVEL, user.level);
    this.storage.set(SUB_UNIT, user.subunit);
    this.storage.set(NIK, user.nik);
    this.isLoggedIn = true;
    this.change.emit(this.isLoggedIn);
  }

  getName(): string {
    return this.storage.get(NAME);
  }

  getSubUnit(): string {
    return this.storage.get(SUB_UNIT);
  }

  getLevel(): string {
    return this.storage.get(LEVEL);
  }

  checkSession(): boolean {
    return this.getName() != null;
  }

  removeSession(): void {
    this.storage.remove(NAME);
    this.storage.remove(LEVEL);
    this.storage.remove(SUB_UNIT);
    this.storage.remove(NIK);
    this.isLoggedIn = false;
    this.change.emit(this.isLoggedIn);
  }
}
