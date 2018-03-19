import { Component, OnInit } from '@angular/core';
import { Activity } from '../model/activity';
import { Progress } from '../model/progress';
import { ActivityService } from '../service/activity.service';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TableProgress } from '../model/table/table-progress';
import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(
    private activityService: ActivityService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private snackBar: MatSnackBar,
    private sessionService: SessionService
  ) { }  
  
  private columns = ['no', 'progress', 'pic', 'pdate'];
  private activity: Activity;
  private dataSource = new MatTableDataSource();
  private progress: Progress[];
  private tableData = new Array();
  private isLoading = true;

  ngOnInit() {
    if(!this.sessionService.checkSession()){
      this.router.navigate(['/login']);
    }
    const id = this.route.snapshot.paramMap.get('id');
    this.getDetail(id);
  }

  getDetail(id): void {
    this.activityService.getActivity(id).subscribe(
      resp => {
        this.activity = resp.body.activity;
        this.progress = resp.body.progress;
        this.isLoading = false;

        let i = 1;
        this.progress.forEach(p => {
          let table = new TableProgress();
          table.no = i;
          table.progress = p;
          i++;
          this.tableData.push(table);
        });
        this.dataSource.data = this.tableData;
      }
    );
  }

  hasProgress(): boolean {
    return this.dataSource.data.length > 0;
  }

  isOpen(): boolean {
    return this.activity.status == "open";
  }

  goBack(): void {
    this.location.back();
  }

  showAddButton(): boolean {
    return true;
  }

  changeStatus(): void {
    let status = "open";
    if(this.activity.status == "open"){
      status = "close";
    }
    this.activityService.changeStatus(status, this.activity.id).subscribe(
      resp => {
        const status = resp.body.stat;
        if(status){
          this.getDetail(this.route.snapshot.paramMap.get('id'));
        } else this.snackBar.open("Gagal Mengubah Status :(", "Tutup");
      });
  }

  deleteItem(id): void {
    this.activityService.deleteActivity(id).subscribe(
      resp => {
        const status = resp.body.stat;
        if(status){
          this.router.navigate(['/activity']);
        } else this.snackBar.open("Gagal Menghapus Data :(", "Tutup");
    });
  }
}
