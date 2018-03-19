import { Component, OnInit } from '@angular/core';
import { SessionService } from '../service/session.service';
import { LoginForm } from '../model/form/login-form';
import { UserService } from '../service/user.service';
import { LoginResponse } from '../model/response/login-response';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private sessionService: SessionService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  private form = new LoginForm();
  private response: LoginResponse;

  private wrongPass = false;
  private notRegistered = false;

  ngOnInit() {
    console.log("Login page rocks!");
  }

  onSubmit(): void {
    this.userService.login(this.form).subscribe(
      resp => {
        this.response = resp.body;
        if(this.response.stat == 300){
          this.createSession();
        } else if (this.response.stat == 400){
          this.notRegistered = true;
          this.wrongPass = false;
        } else if (this.response.stat == 500){
          this.wrongPass = true;
          this.notRegistered = false;
        } else if (this.response.stat == 600){
          this.snackBar.open("Tidak Terhubung ke Jaringan Telkom", "Tutup");
        }
    });
  }

  createSession(): void {
    this.sessionService.setAll(this.response);
    this.router.navigate(['/activity']);
  }
}
