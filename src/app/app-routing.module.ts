import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembreComponent } from './membre/membre.component';
import { MembreFormComponent } from './membre-form/membre-form.component';

const routes: Routes = [
   //l'ordre des routes est important
  {
    path:'',
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
    path:'**',
    component: MembreComponent
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
