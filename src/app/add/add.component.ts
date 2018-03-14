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
    private snackBar: MatSnackBar
  ) { }

  private form = new MainForm();
  private date = moment(new Date());
  private units = [
    "Business Planning & Performance",
    "Performance & War Room",
    "Plan & Budget Control", 
    "Quality & Change Management",
    "Revenue Assurance"
  ];
  private status: boolean;
  private users: any[];

  ngOnInit() {
    this.users = [
      {id: 3, pic: false, name: 'Aditya Amirullah'},
      {id: 6, pic: false, name: 'Firman Syah'},
      {id: 8, pic: false, name: 'Josia P. Tarigan'},
    ];
    this.form.subunit = "Business Planning & Performance";
    this.form.deadline = "24 Mar 2018" // gonna use this for edit component to set default value
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
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  // to get an array of Id's as value to form.pic
  public get selectedValue() : number[] {
    return this.users
      .filter(u => u.pic)
      .map(u => u.id);
  }
  
  validate(): void {
    
  }
}
