import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembreComponent } from './membre/membre.component';
import { MembreFormComponent } from './membre-form/membre-form.component';
import { PublicationComponent } from './publication/publication.component';
import { EvenementComponent } from './evenement/evenement.component';
import { EvenementFormComponent } from './evenement-form/evenement-form.component';
import { OutilComponent } from './outil/outil.component';
import { OutilFormComponent } from './outil-form/outil-form.component';
import { PublicationFormComponent } from './publication-form/publication-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
   //l'ordre des routes est important
  {
    path:'',
    component: DashboardComponent
  },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'membre',
    component: MembreComponent
  },
  {
    path:'createMembre',
    component: MembreFormComponent
  },
  {
    path:':editMembre/:id',
    component: MembreFormComponent
  },
  {
    path: 'outil',
    component: OutilComponent
  },
  {
    path:'createOutil',
    component: OutilFormComponent
  },
  {
    path:':editOutil/:id',
    component: OutilFormComponent
  },
  {
    path: 'evenement',
    component: EvenementComponent
  },
  {
    path:'createEvenement',
    component: EvenementFormComponent
  },
  {
    path:':editEvenement/:id',
    component: EvenementFormComponent
  },
  {
    path: 'publication',
    component: PublicationComponent
  },
  {
    path:'createPublication',
    component: PublicationFormComponent
  },
  {
    path:':editPublication/:id',
    component: PublicationFormComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
