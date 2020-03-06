import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './pages/index/index.component';
import { ProfilepageComponent } from './pages/examples/profilepage/profilepage.component';
import { RegisterpageComponent } from './pages/examples/registerpage/registerpage.component';
import { LandingpageComponent } from './pages/examples/landingpage/landingpage.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardService } from './services/authguard.service';
import { HomeuserComponent } from './pages/homeuser/homeuser.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: IndexComponent },
  { path: 'home-user', component: HomeuserComponent, canActivate: [AuthGuardService] },
  { path: 'register', component: RegisterpageComponent, canActivate: [AuthGuardService] },
  { path: 'profile', component: ProfilepageComponent },
  { path: 'landing', component: LandingpageComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: []
})
export class AppRoutingModule {}
