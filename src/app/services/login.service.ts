import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly staticEmail = 'nouha.hadhri@enis.tn';
  private readonly staticPassword = '123456';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private router: Router) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  // Login statique
  login(email: string, password: string): Observable<boolean> {
    if(email === this.staticEmail && password === this.staticPassword) {
      localStorage.setItem('token', 'dummy-token');
      this.loggedIn.next(true);
      return of(true); // Observable
    }
    return of(false);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
