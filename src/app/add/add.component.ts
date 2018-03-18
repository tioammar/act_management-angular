import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from '../service/activity.service';
import { MainForm } from '../model/form/main-form';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { StatusResponse } from '../model/response/status-response';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';
import { UserService } from '../service/user.service';
import { UserForm } from '../model/form/user-form';
import { User } from '../model/user';

export const FORMATS = {
  parse: {
    dateInput: 'D MMM Y',
  },
  display: {
    dateInput: 'D MMM Y',
    monthYearLabel: 'Y',
    dateA11yLabel: 'D',
    monthYearA11yLabel: 'MMM Y'
  }
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: FORMATS}
  ]
})
export class AddComponent implements OnInit {

  constructor(
    private router: Router,
    private activityService: ActivityService,
    private location: Location,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) { }

  private units = [
    "Business Planning & Performance",
    "Performance & War Room",
    "Plan & Budget Control", 
    "Quality & Change Management",
    "Revenue Assurance"
  ];

  private form = new MainForm();
  private date = moment(new Date());
  private status: boolean;
  private users: User[];
  private userForm = new Array();

  ngOnInit() {
    this.buildUserForm();
    this.form.subunit = "Business Planning & Performance";
  }

  onSubmit(): void {
    this.form.pic = this.selectedValue;
    this.form.deadline = this.date.format("D MMM Y");
    this.activityService.addActivity(this.form).subscribe(
      resp => {
        this.status = resp.body.stat;
        if(this.status){
          this.router.navigate(['/activity']);
        } else this.snackBar.open("Gagal Memasukkan Data", "Tutup");
      });
  }

  buildUserForm(): void {
    this.userService.getUsers().subscribe(
      resp => {
        this.users = resp.body.users;
        this.users.forEach(u => {
          let uf = new UserForm();
          uf.id = u.id;
          uf.name = u.name;
          uf.pic = false;
          this.userForm.push(uf);
        });
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  public get selectedValue() : number[] {
    return this.userForm
      .filter(u => u.pic)
      .map(u => u.id);
  }
  
  validate(): void {
    
  }
}
