import { Component, Input, OnChanges, Inject, OnInit } from '@angular/core';
import { EmmiterService } from '../services/emmiter.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { MatSnackBar } from '@angular/material';
import { ReportComponent } from '../report/report.component';

interface Report {
    detail: string;
    url: string;
    id?: string;
}

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent {

    email: string;
    password: string;
    constructor() { }

    login() {
        console.log(this.email, this.password);
    }
 }