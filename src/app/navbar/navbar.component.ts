import { Component, OnInit } from '@angular/core';
import { SessionService } from '../service/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) { }

  private isLoggedIn = false;

  ngOnInit() {
    if(this.sessionService.checkSession()){
      this.isLoggedIn = true;
    }
    this.sessionService.change.subscribe(status => {
      this.isLoggedIn = status;
    })
  }

  logOut(){
    this.sessionService.removeSession();
    this.isLoggedIn = false;
  }
}
