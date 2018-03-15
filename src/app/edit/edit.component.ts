import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '../model/activity';
import { ActivityService } from '../service/activity.service';
import { MainForm } from '../model/form/main-form';
import { User } from '../model/user';
import { UserForm } from '../model/form/user-form';
import { UserService } from '../service/user.service';
import * as moment from 'moment';
import { MAT_DATE_FORMATS } from '@angular/material';
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
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: FORMATS}
  ]
})
export class EditComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private form: MainForm,
    // private activityService: ActivityService,
    // private userService: UserService
  ) { }

  private units = [
    "Business Planning & Performance",
    "Performance & War Room",
    "Plan & Budget Control", 
    "Quality & Change Management",
    "Revenue Assurance"
  ];

  private id: number;
  // private activity: Activity;
  // private form = new MainForm();

  // this gonna be come from getUsers
  private users = [
    {id: 3, name: "Aditya Amirullah"},
    {id: 6, name: "Firman Syah"},
    {id: 8, name: "Josia P. Tarigan"} 
  ];

  // this gonna be come from activity.pic
  private pics = [
    {id: 3, name: "Aditya Amirullah"},
    {id: 8, name: "Josia P. Tarigan"}
  ];

  private pic = new Array();
  private userForm = new Array();
  private date: any;

  ngOnInit() {
    // this.id = Number(this.route.snapshot.paramMap.get('id'));
    // this.getActivity();
    // this.activity.pic.forEach(p => {
    //   this.pic.push(p.id);
    // });

    this.pics.forEach(p => {
      this.pic.push(p.id);
    });

    this.form.activity = "Tes";
    this.form.deadline = "6 Mar 1992";
    this.date = moment(new Date(this.form.deadline));
    this.form.note = "-";
    this.form.subunit = "Plan & Budget Control";
    this.buildUserForm();
  }

  // getActivity(): void {
  //   this.activityService.getActivity(this.id).subscribe(
  //     resp => {
  //       this.activity = resp.body.activity;
  //     }
  //   );
  // }

  buildUserForm(): void {
    // this.userService.getUsers().subscribe(
    //   resp => {
    //     this.users = resp.body.users;
    //   }
    // );
    this.users.forEach(u => {
      let uf = new UserForm();
      uf.id = u.id;
      uf.name = u.name;
      uf.pic = this.pic.includes(u.id);
      if(uf.pic) console.log(uf.name);
      this.userForm.push(uf);
    });
  }

  private get selectedValue(): number[] {
    return this.userForm
      .filter(u => u.pic)
      .map(u => u.id);
  }

  onSubmit(): void {
    this.form.pic = this.selectedValue;
    this.form.deadline = this.date.format("D MMM Y");
    // send data using service
  }

  goBack(): void {
    this.location.back();
  }
}
