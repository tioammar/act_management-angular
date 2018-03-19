import { Component, OnInit } from '@angular/core';
import { Activity } from '../model/activity';
import { ActivityService } from '../service/activity.service';
import { MatTableDataSource } from '@angular/material'
import { DataSource } from '@angular/cdk/table';
import { HttpResponse } from '@angular/common/http';
import { AllResponse } from '../model/response/all-response';
import { Observable } from 'rxjs';
import { TableActivity } from '../model/table/table-activity';
import { SessionService } from '../service/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  constructor(
    private activityService: ActivityService,
    private sessionService: SessionService,
    private router: Router
  ) { }

  private columns = ['no', 'activity', 'subunit', 'pic', 'deadline', 'stat', 'note'];
  private dataSource = new MatTableDataSource();
  private activities: Activity[];
  private data = new Array();

  private isLoading = true;
  
  ngOnInit() {
    if(!this.sessionService.checkSession()){
      this.router.navigate(['/login']);
    }
    console.log("main start!");
    this.getActivities();
  }

  getActivities(): void {
    this.activityService.getActivities().subscribe(
      resp => {
        this.activities = resp.body.activities;
        this.isLoading = false;  
        let i = 1;
        this.activities.forEach(a => {
          let table = new TableActivity();
          table.no = i;
          table.activity = a;
          i++;
          this.data.push(table);
        });
        this.dataSource.data = this.data;
      });
  }

  updateData(): void {
    this.data = [];
    this.isLoading = true; 
    this.getActivities();
  }

  hasActivity(): boolean {
    return this.dataSource.data.length > 0;
  }

  isOpen(status: string): boolean {
    return status == "open";
  }
}

