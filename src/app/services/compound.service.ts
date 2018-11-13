import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Compound } from '../models/compound';
import { Observable} from 'rxjs/Rx';
import { EmmiterService } from './emmiter.service';
import 'rxjs/add/operator/map'

@Injectable()
export class CompoundService {
     constructor (private http: Http) {}
     private translateURL = 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyAVTjIDdVpxk4xW885S7ysm-aVjf1mmT2g&source=ES&target=EN&q=';  
     private untranlateURL = 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyAVTjIDdVpxk4xW885S7ysm-aVjf1mmT2g&source=EN&target=ES&q=';
     private smilesURL = 'https://cactus.nci.nih.gov/chemical/structure/'

     translateCompound(compound: string){
        let headers = new Headers({ 'Content-Type': 'application/json'}); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let url = this.translateURL+""+compound;
        console.log('REQUEST')
        EmmiterService.get('request').emit('OLASOYMARIO')
        //console.log(url);
        return this.http.get(url, {headers: headers})
        .map((res:Response) => res.json())
        
     }

     untranslateCompound(compound: string){
        let headers = new Headers({ 'Content-Type': 'application/json'}); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let url = this.untranlateURL+""+compound;
        console.log(url);
        return this.http.get(url, {headers: headers})
        .map((res:Response) => res.json())
        
     }

     generateSMILES(translatedCompound: string):Observable<any> {
        let url = this.smilesURL+translatedCompound+"/smiles";
        console.log(url);
        return this.http.get(url)
                        .map((res:Response) => res.text())
     }

     getCompoundInfo(compound):Observable<any> {
         let url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${compound}/JSON`;
         console.log(url);
         return this.http.get(url)
                         .map((res:Response) => res.json())
     }
     
}