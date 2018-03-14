import { Component, OnInit } from '@angular/core';
import { Activity } from '../model/activity';
import { ActivityService } from '../service/activity.service';
import { MatTableDataSource } from '@angular/material'
import { DataSource } from '@angular/cdk/table';
import { HttpResponse } from '@angular/common/http';
import { AllResponse } from '../model/response/all-response';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  constructor(private activityService: ActivityService) { }

  private columns = ['no', 'activity', 'subunit', 'pic', 'deadline', 'stat', 'note'];
  private dataSource = new MatTableDataSource();

  private isLoading = true; // show loading spinner
  
  ngOnInit() {
    this.getActivities();
  }

  getActivities(): void {
    this.activityService.getActivities().subscribe(
      resp => {
        this.dataSource.data = resp.body.activities;
        this.isLoading = false; // hide loading spinner
      }
    );
  }

  updateData(): void {
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

