import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CompoundComponent } from './compound/compound.component';
import { InitComponent } from './init.component';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './report/report.component';
import { ReportListComponent } from './reportList/reportList.component';
import { SearcherComponent } from './searcher/searcher.component';

import { Dropdown } from './dropdown/dropdown';

import { HttpModule, RequestOptions, Headers } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import 'materialize-css';
import { MaterializeModule } from 'angular2-materialize';
import { CollapsibleModule } from 'angular2-collapsible'; // <-- import the module

import {MatDialogModule} from '@angular/material';

import {MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule} from '@angular/material';



import { EmmiterService } from './services/emmiter.service';
import { CompoundService } from './services/compound.service';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  {path: '', component: AppComponent},
  {path: 'login', component: LoginComponent},
  {path: 'reports', component: ReportListComponent}
];

export const firebaseConfig = {
  apiKey: 'AIzaSyAfsWjLnNWWZ6I5HgGfwYEB984RWpfsMXw',
  authDomain: 'alquimestrio.firebaseapp.com',
  databaseURL: 'https://alquimestrio.firebaseio.com',
  projectId: 'alquimestrio',
  storageBucket: 'alquimestrio.appspot.com',
  messagingSenderId: '242776282081',
};


@NgModule({
  declarations: [
    AppComponent,
    CompoundComponent,
    InitComponent,
    LoginComponent,
    ReportComponent,
    ReportListComponent,
    SearcherComponent,
    Dropdown
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,  // <-- include required BrowserAnimationsModule
    CollapsibleModule,

    MatDialogModule,
    MatButtonModule,
    MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  AngularFireModule.initializeApp(firebaseConfig),
  AngularFirestoreModule,
  RouterModule.forRoot(appRoutes)
  ],
  providers: [
    EmmiterService,
    CompoundService,
    HttpModule
  ],
  bootstrap: [InitComponent],
  entryComponents: [CompoundComponent, ReportComponent]
})
export class AppModule { }
