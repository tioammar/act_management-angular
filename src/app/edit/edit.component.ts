import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from '../model/activity';
import { ActivityService } from '../service/activity.service';
import { MainForm } from '../model/form/main-form';
import { User } from '../model/user';
import { UserForm } from '../model/form/user-form';
import { UserService } from '../service/user.service';
import * as moment from 'moment';
import { MAT_DATE_FORMATS, MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';

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
  selector: 'app-edit',
  templateUrl: '../add/add.component.html',
  styleUrls: ['../add/add.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: FORMATS}
  ]
})
export class EditComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private activityService: ActivityService,
    private userService: UserService,
    private router: Router
  ) { }

  private units = [
    "Business Planning & Performance",
    "Performance & War Room",
    "Plan & Budget Control", 
    "Quality & Change Management",
    "Revenue Assurance"
  ];

  private activity: Activity;
  private users: User[];
  private form = new MainForm();
  private pic = new Array();
  private userForm = new Array();
  private date: any;
  private snackBar: MatSnackBar;
  private isLoading = true;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getActivity(id);
  }

  getActivity(id): void {
    this.activityService.getActivity(id).subscribe(
      resp => {
        this.activity = resp.body.activity;    
        this.activity.pic.forEach(p => {
          this.pic.push(p.id);
        });    
        this.form.activity = this.activity.activity;
        this.form.deadline = this.activity.deadline;
        this.date = moment(new Date(this.form.deadline));
        this.form.note = this.activity.note;
        this.form.subunit = this.activity.subunit;
        this.buildUserForm();
        this.isLoading = false;
      }
    );
  }

  buildUserForm(): void {
    this.userService.getUsers().subscribe(
      resp => {
        this.users = resp.body.users;
        this.users.forEach(u => {
          let uf = new UserForm();
          uf.id = u.id;
          uf.name = u.name;
          uf.pic = this.pic.includes(u.id);
          if(uf.pic) console.log(uf.name);
          this.userForm.push(uf);
        });
      }
    );
  }

  private get selectedValue(): number[] {
    return this.userForm
      .filter(u => u.pic)
      .map(u => u.id);
  }

  onSubmit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.form.pic = this.selectedValue;
    this.form.deadline = this.date.format("D MMM Y");
    this.activityService.editActivity(id, this.form).subscribe(
      resp => {
        const status = resp.body.stat;
        if(status){
          this.router.navigate(['/detail', id]);
        } else this.snackBar.open("Gagal Mengubah Data", "Tutup");
    });
  }

  goBack(): void {
    this.location.back();
  }
}
