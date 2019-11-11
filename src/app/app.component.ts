import { Component, OnInit, OnChanges } from '@angular/core';
import { NgForm, FormControl, FormGroupDirective, FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Compound } from './models/compound';
import { EmmiterService } from './services/emmiter.service';
import { CompoundService } from './services/compound.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CompoundComponent } from './compound/compound.component';
import { ErrorStateMatcher } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmited = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmited));
  }
}

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnChanges {

  compoundFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(private compoundService: CompoundService, public dialog: MatDialog) {}

  compoundDialogRef: MatDialogRef<CompoundComponent>;

  listId = 'IDK MAYBE COCACOLA';
  compoundTxt = new FormControl('');
  translatedCompound = '';
  compoundSrc = '';
  count = 0;
  megustanlosmemes = false;

  compounds1: Compound[] = [];
  compounds2: Compound[] = [];
  iterate = false;
  status = true;
  details = false;
  setSMILES = false;

  ngOnInit() {
    console.log(this.compounds1);
    // $.getScript('assets/assets/build/js/main.js', () => {
    //  console.log('Script cargado');
    // });
  }

  f() {
    this.f();
    if (this.translatedCompound === '') {
      this.generateCompound();
    } else {
      this.generateSMILES();
    }

  }

  generateCompound() {
    console.log(this.setSMILES,'SETSMILES')
      EmmiterService.get('request').subscribe(res => {
        this.megustanlosmemes = true;
        console.log(`MEGUSTANLOSMEMES ${res}`);
      });
      console.log(this.compoundTxt.value);
      this.compoundService.translateCompound(this.compoundTxt.value)
    .subscribe(
      response => {
        console.log(response.data.translations[0].translatedText);
        this.translatedCompound = response.data.translations[0].translatedText;
        if(this.setSMILES) {
          this.getImage(this.compoundTxt.value);
        } else {
          this.generateSMILES();
        }
      },
      err => {
        console.log(err);
      });
    }
    getImage(uri) {
      this.status = false;
      this.megustanlosmemes = false;
      const x = encodeURIComponent(uri);
        console.log(x, 'ENCODED');
        this.compoundSrc = `http://3.17.56.131:8080/molecule/${x}`;
        //this.compoundSrc = `http://localhost:4500/molecule/${x}`;

        if (this.iterate) {
          this.compounds1.push({ compoundName: this.compoundTxt.value, compoundNameEn: this.translatedCompound, compoundSrc: this.compoundSrc, count: this.count });
          this.iterate = !this.iterate;
        } else {
          this.compounds2.push({ compoundName: this.compoundTxt.value, compoundNameEn: this.translatedCompound, compoundSrc: this.compoundSrc, count: this.count });
          this.iterate = !this.iterate;
        }
        this.count++;
        this.compoundSrc = '';
        this.compoundTxt.setValue('');
        this.status = true;
    }

  generateSMILES() {
      console.log(`TRANS ${this.translatedCompound}`);
      if (this.compoundTxt.value === '') {
      this.status = false;
      this.megustanlosmemes = false;
      return;
    }
      this.compoundService.generateSMILES(this.translatedCompound)
    .subscribe(
      response => {

        console.log('SUCCESS');
        this.megustanlosmemes = false;

        // console.log(response);
        this.getImage(response);
      },
      err => {
        console.log(this.status);
        this.status = false;
        this.megustanlosmemes = false;
        return;
      });
    }

  checkCompound(e) {

  }

  createCompound() {

  }

  removeCompound (compound, array) {
    if (array === 1) {
      for (let i = 0; i < this.compounds1.length; i++) {
        if (this.compounds1[i].count === compound) {
          this.compounds1.splice(i, 1);
        }
      }
    } else {
      for (let i = 0; i < this.compounds2.length; i++) {
        if (this.compounds2[i].count === compound) {
          this.compounds2.splice(i, 1);
        }
      }
    }
  }

  openDialog(compoundName, compoundNameEn, compoundSrc) {
    this.compoundService.getCompoundInfo(compoundNameEn)
    .subscribe(
      response => {
        console.log(response.PC_Compounds[0].props);
        const props = response.PC_Compounds[0].props;
        this.compoundService.untranslateCompound(props[9].value.sval)
        .subscribe(
          response => {
            this.details = true;
            const iupac = response.data.translations[0].translatedText;
            let dialogRef
            if(props.length == 21) {
              dialogRef = this.dialog.open(CompoundComponent, {
                height: '90%',
                data: { details: this.details, compoundName, compoundSrc, iupac, inchi: props[11].value.sval, molecularFormula: props[15].value.sval, molecularWeight: props[16].value.fval, smiles: props[17].value.sval },
              });
            } else if (props.length == 20) {
              dialogRef = this.dialog.open(CompoundComponent, {
                height: '90%',
                data: { details: this.details, compoundName, compoundSrc, iupac, inchi: props[11].value.sval, molecularFormula: props[14].value.sval, molecularWeight: props[15].value.fval, smiles: props[17].value.sval },
              });
            } else if(props.length == 22) {
              dialogRef = this.dialog.open(CompoundComponent, {
                height: '90%',
                data: { details: this.details, compoundName, compoundSrc, iupac, inchi: props[12].value.sval, molecularFormula: props[16].value.sval, molecularWeight: props[17].value.fval, smiles: props[18].value.sval },
              });
            } else {
              console.log(props);
            }
            

            dialogRef.afterClosed().subscribe(result => {
              console.log(`Dialog result: ${result}`);
            });
          },
          err => {
            console.log(err);
          },
        );

      },
      err => {
        console.log(err);
        const dialogRef = this.dialog.open(CompoundComponent, {
          height: '90%',
          data: { details: this.details, compoundName, compoundSrc },
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      },
    );
    this.details = false;
  }

  ngOnChanges() {
    console.log(`MEGUSTANLOSMEMES`);

  }
}

// Nomenclatura stock
// oxido de hierro
// oxido ferroso (2)- oxido ferrico (3)
