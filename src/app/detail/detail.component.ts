import { Component, OnInit } from '@angular/core';
import { Activity } from '../model/activity';
import { Progress } from '../model/progress';
import { ActivityService } from '../service/activity.service';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TableProgress } from '../model/table/table-progress';

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
    private snackBar: MatSnackBar
  ) { }  
  
  private columns = ['no', 'progress', 'pic', 'pdate'];
  private activity: Activity;
  private dataSource = new MatTableDataSource();
  private status: boolean;
  private progress: Progress[];
  private tableData = new Array();

  private isLoading = true;

  ngOnInit() {
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

  OpenSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  deleteItem(id: number): void {
    this.activityService.deleteActivity(id).subscribe(
      resp => {
        this.status = resp.body.stat;
      }
    );
    if(this.status){
      this.router.navigate(['/activity']);
    } else this.snackBar.open("Gagal Menghapus Aktifitas", "Tutup",
      {duration: 2000});
  }
}
