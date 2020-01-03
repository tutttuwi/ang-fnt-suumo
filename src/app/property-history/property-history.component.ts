import { Component, OnInit } from '@angular/core';
import { Property } from '../property/property';
@Component({
  selector: 'app-property-history',
  templateUrl: './property-history.component.html',
  styleUrls: ['./property-history.component.sass']
})
export class PropertyHistoryComponent implements OnInit {
  propertydata: Property[] = [];
  constructor() {}
  ngOnInit() {
    const lspd = JSON.parse(localStorage.getItem('propertydata_history'));
    this.propertydata = lspd ? lspd : [];
  }
  delPropertyAll() {
    if (confirm('履歴情報を削除しますか？')) {
      this.propertydata.forEach(v => {
        this.addTrush(v);
      });
      this.propertydata = [];
      localStorage.removeItem('propertydata_history');
    }
  }
  delProperty(url: string) {
    this.addTrush(
      this.propertydata.find(p => {
        if (p.url === url) {
          return p;
        }
      })
    );
    this.propertydata = this.propertydata.filter(p => p.url !== url);
    localStorage.setItem('propertydata_history', JSON.stringify(this.propertydata));
  }
  addTrush(data: Property) {
    let td: Property[] = JSON.parse(localStorage.getItem('propertydata_trush'));
    if (td == null || td[0] == null) {
      td = [];
    } else {
      td = td.filter(p => p.url !== data.url);
    }
    td.push(data);
    if (td.length > 100) {
      // item is more than 100, then delete first one.
      td.shift();
    }
    console.log('data ---' + JSON.stringify(data));
    console.log('td ---' + JSON.stringify(td));
    localStorage.setItem('propertydata_trush', JSON.stringify(td));
  }
}
