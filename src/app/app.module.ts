import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MembreComponent } from './membre/membre.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MatTableModule } from '@angular/material/table';
import {MatIconModule } from '@angular/material/icon';
import {MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule } from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import { MembreFormComponent } from './membre-form/membre-form.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { OutilComponent } from './outil/outil.component';
import { EvenementComponent } from './evenement/evenement.component';
import { PublicationComponent } from './publication/publication.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { TemplateComponent } from './template/template.component';
import { OutilFormComponent } from './outil-form/outil-form.component';
import { EvenementFormComponent } from './evenement-form/evenement-form.component';
import { PublicationFormComponent } from './publication-form/publication-form.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    MembreComponent,
    ConfirmDialogComponent,
    MembreFormComponent,
    OutilComponent,
    EvenementComponent,
    PublicationComponent,
    DashboardComponent,
    TemplateComponent,
    OutilFormComponent,
    EvenementFormComponent,
    PublicationFormComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSidenavModule, MatToolbarModule, MatListModule, MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatRadioModule,
    MatSelectModule,
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }