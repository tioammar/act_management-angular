import { Component, OnInit } from '@angular/core';
import { SessionService } from './service/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Komodo';

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit() {
    // check if user logged in status changed
    this.sessionService.change.subscribe(status => {
      if(!status) this.router.navigate(['/login']);
    });
  } 
}
