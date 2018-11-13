import { Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

  interface Report {
    detail: string;
    url: string;
    name: string;
    date: string;
    category: string;
    id?: string;
}

@Component({
    selector: 'reportList-component',
    templateUrl: 'reportList.component.html',
    styleUrls: ['reportList.component.css']
})

export class ReportListComponent implements OnInit{
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    sortedData: Report[];

    dataSource: Report[];

    constructor(private afs: AngularFirestore) {
    }

    reportDoc: AngularFirestoreCollection<Report>;

    sortData(sort: Sort) {
        const data = this.dataSource.slice();
        if (!sort.active || sort.direction === '') {
          this.sortedData = data;
          return;
        }
    
        this.sortedData = data.sort((a, b) => {
          const isAsc = sort.direction === 'asc';
          switch (sort.active) {
            case 'id': return compare(a.id, b.id, isAsc);
            case 'name': return compare(a.name, b.name, isAsc);
            case 'category': return compare(a.category, b.category, isAsc);
            case 'detail': return compare(a.detail, b.detail, isAsc);
            case 'date': return compare(a.date, b.date, isAsc);
            case 'url': return compare(a.url, b.url, isAsc);
            default: return 0;
          }
        });
      }

      ngOnInit() {
        this.reportDoc = this.afs.collection('reports');
        const collection = this.reportDoc.valueChanges()
        collection.subscribe(data => {
            this.dataSource = data;
            this.sortedData = this.dataSource.slice();
        })
      }
      
    }

    function compare(a, b, isAsc) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }