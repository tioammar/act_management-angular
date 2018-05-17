import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ActivityComponent } from './activity/activity.component';
import { DetailComponent } from './detail/detail.component';
import { ActivityService } from './service/activity.service';

import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, NativeDateModule, MatFormFieldModule, MatCheckboxModule, MatSelectModule, MatProgressSpinnerModule, MatToolbarModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MatCardModule } from '@angular/material';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { UserService } from './service/user.service';
import { MainForm } from './model/form/main-form';
import { UserForm } from './model/form/user-form';
import { StorageServiceModule, SESSION_STORAGE } from 'ngx-webstorage-service';
import { SESSION_TOKEN, SessionService } from './service/session.service';
import { LoginComponent } from './login/login.component';
import { AddProgressComponent } from './add-progress/add-progress.component';

const routes: Routes = [
  { path: 'activity', component: ActivityComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: '', redirectTo: '/activity', pathMatch: 'full' },
  { path: 'edit/:id', component: EditComponent },
  { path: 'add', component: AddComponent },
  { path: 'login', component: LoginComponent }
] 

@NgModule({
  declarations: [
    AppComponent,
    ActivityComponent,
    DetailComponent,
    NavbarComponent,
    EditComponent,
    AddComponent,
    LoginComponent,
    AddProgressComponent
  ],
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: true }
    ),
    BrowserModule,
    StorageServiceModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatTableModule,
    MatCardModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NativeDateModule,
    MomentDateModule,
    MatCheckboxModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  providers: [
    ActivityService,
    UserService,
    MainForm,
    UserForm,
    {provide: SESSION_TOKEN, useExisting: SESSION_STORAGE},
    SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
