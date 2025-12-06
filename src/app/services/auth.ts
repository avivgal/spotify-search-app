import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);

  isLoggedIn = signal<boolean>(false);

  constructor() {
    const saved = localStorage.getItem('loggedIn');
    this.isLoggedIn.set(saved === 'true');
  }

  login() {
    this.isLoggedIn.set(true);
    localStorage.setItem('loggedIn', 'true');
  }

  logout() {
    this.isLoggedIn.set(false);
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/register']);
  }
}
