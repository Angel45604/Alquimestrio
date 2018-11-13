import { Component, Input, OnChanges, Inject, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroupDirective, FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { EmmiterService } from '../services/emmiter.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ErrorStateMatcher } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmited = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmited));
    }
}

interface Report {
    detail: string;
    url: string;
    name: string;
    date: string;
    category: string;
    id?: string;
}

@Component({
    selector: 'report-component',
    templateUrl: 'report.component.html',
    styleUrls: ['report.component.css']
})

export class ReportComponent implements OnInit {


    catFormControl = new FormControl('', [
        Validators.required,
        Validators.minLength(4)
        
    ]);

    matcher = new MyErrorStateMatcher();

    detail = new FormControl('');
    cats = [{value: "Compuesto" , viewValue: "Compuesto" },
            {value: "Descripcion", viewValue: "Descripcion" }];
    reportDoc: AngularFirestoreCollection<Report>;

    constructor(
        public dialogRef: MatDialogRef<ReportComponent>,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private afs: AngularFirestore) { }
    
      onNoClick(): void {
        this.dialogRef.close();
      }

      @Input('compoundName')compoundName: string;
      @Input('compoundSrc')compoundSrc: string;

      reportCompound(compoundName, compoundSrc) {
          if(this.detail.value == "") {
            let snackBarAddReport = this.snackBar.open('Por favor ingresa el detalle');
            setTimeout(() => {
                snackBarAddReport.dismiss()
            }, 1500);
          } else if(this.catFormControl.value == ""){
            let snackBarAddReport = this.snackBar.open('Por favor selecciona una');
            setTimeout(() => {
                snackBarAddReport.dismiss()
            }, 1500);
          } else {
                this.reportDoc.add( {
                    detail: this.detail.value,
                    name: compoundName,
                    url: compoundSrc,
                    date: ""+new Date(),
                    category: this.catFormControl.value
                })
                let snackBarAddReport = this.snackBar.open('Compuesto Reportado exitosamente');
                setTimeout(() => {
                    snackBarAddReport.dismiss()
                }, 1500);
                this.detail.setValue('');
                this.dialogRef.close();
                }
      }

      ngOnInit() {
        this.reportDoc = this.afs.collection('reports');
      }
}