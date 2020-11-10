import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  public loginInvalid: boolean;

  private returnUrl: string;


  constructor(

    private fb: FormBuilder,

    private route: ActivatedRoute,

    private router: Router,

    private authService: AuthService

  ) {

  }


  ngOnInit() {

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/todo-list';
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (this.authService.loggedIn()) {
      this.router.navigate([this.returnUrl]);
    }
  }


  onSubmit() {
    this.loginInvalid = false;
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(res => {
        localStorage.setItem('apiKey', res.apiKey);
        this.router.navigate(['/todo-list']);
      }, err => {
        this.loginInvalid = true;
      });
    }

  }

}
