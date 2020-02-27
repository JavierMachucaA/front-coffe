import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CredentialDto } from 'src/app/internal/credential.dto';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as jwt_decode from 'jwt-decode';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  public user;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  public get f() {
    return this.loginForm.controls;
  }

  public onSubmit() {
    console.log('Se iniciara sesión', this.loginForm);
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const credential: CredentialDto = { email: this.f.username.value, password: this.f.password.value };
    console.log(credential);
    this.authService.login(credential)
      .subscribe(
        response => {
          console.log(response);
          const token = response.token;
          localStorage.setItem('token', JSON.stringify(token));
          this.user = jwt_decode(token);
        },
        error => {
          // this.error = error;
          this.loading = false;
        });
  }

}
