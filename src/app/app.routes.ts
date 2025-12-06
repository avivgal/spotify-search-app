import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { DiscDetailsComponent } from './features/disc-details/disc-details';
import { RegisterComponent } from './features/register/register';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'disc/:id', component: DiscDetailsComponent, canActivate: [authGuard] },

  { path: 'register', component: RegisterComponent },
];
