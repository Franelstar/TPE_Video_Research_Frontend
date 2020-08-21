import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FilterPipe } from './filter.pipe';
import { SauvegarderComponent } from './sauvegarder/sauvegarder.component';

import {RouterModule, Routes} from '@angular/router'
import { ApiServiceService } from './service/api-service.service';
import { HeaderService } from './service/header.service';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HomeComponent } from './home/home.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { InputFileConfig, InputFileModule } from 'ngx-input-file';
import { ModalComponent } from './modal/modal.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'sauvegarder', component: SauvegarderComponent },
  { path: '**', redirectTo: '' }
];

const config: InputFileConfig = {};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FilterPipe,
    SauvegarderComponent,
    HomeComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    NgMultiSelectDropDownModule.forRoot(),
    InputFileModule.forRoot(config)
  ],
  providers: [
    ApiServiceService,
    HeaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
