import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent {

  constructor(public loginService: LoginService) {}

  // Méthode qui appelle le service
  logout(): void {
    this.loginService.logout();
  }

}
