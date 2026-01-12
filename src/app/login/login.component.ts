import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  hidePassword = true;
  loginError = '';

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
  if(this.loginForm.valid) {
    const { email, password } = this.loginForm.value;

    this.loginService.login(email, password).subscribe(success => {
      if(success) {
        // redirection manuelle si besoin
        this.router.navigate(['/dashboard']);
      } else {
        alert('Email ou mot de passe incorrect');
      }
    });
  }
}


  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

}
