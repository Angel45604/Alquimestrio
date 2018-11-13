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
    selector: 'compound-component',
    templateUrl: 'compound.component.html',
    styleUrls: ['compound.component.css']
})

export class CompoundComponent implements OnInit{

    reportDoc: AngularFirestoreCollection<Report>;


    constructor(
        public dialogRef: MatDialogRef<CompoundComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public snackBar: MatSnackBar,
        public dialog : MatDialog,
        private afs: AngularFirestore) { }
    
      onNoClick(): void {
        this.dialogRef.close();
      }

      @Input('compoundSrc')compoundSrc: string;

      reportCompound(compoundName, compoundSrc) {
        this.reportDoc.add( {
            detail: compoundName,
            url: compoundSrc
        })
        let snackBarAddReport = this.snackBar.open('Compuesto Reportado exitosamente');
        setTimeout(() => {
            snackBarAddReport.dismiss()
        }, 1500);
      }

      reportCompound2(compoundName, compoundSrc) {
        const dialogRef = this.dialog.open(ReportComponent, {
            height: '90%',
            data: { compoundName: compoundName, compoundSrc: compoundSrc}
          });
      
          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
          });
      }

      ngOnInit() {
          this.reportDoc = this.afs.collection('reports');
      }
 }