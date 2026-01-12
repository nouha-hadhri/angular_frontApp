import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:string="";
  password:string="";
  //injection de dependance
  constructor(private LS:LoginService, private router:Router) {}

 

  login(){
    //appeler le service
    this.LS.signInWithEmailAndPassword(this.email, this.password).then(()=>{
      this.router.navigate(['/dashboard'])
  })}
  
}
