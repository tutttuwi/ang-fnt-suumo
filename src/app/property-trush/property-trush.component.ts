import { Component, OnInit } from '@angular/core';
import { Property } from '../property/property';

@Component({
  selector: 'app-property-trush',
  templateUrl: './property-trush.component.html',
  styleUrls: ['./property-trush.component.sass']
})
export class PropertyTrushComponent implements OnInit {
  propertydata: Property[] = [];
  constructor() {}
  ngOnInit() {
    const lspd = JSON.parse(localStorage.getItem('propertydata_trush'));
    console.log('propertydata_length' + this.propertydata.length);
    console.log('propertydata_length' + JSON.stringify(lspd));
    this.propertydata = lspd ? lspd : [];
  }
  delPropertyAll() {
    if (confirm('履歴情報を削除しますか？')) {
      this.propertydata = [];
      localStorage.removeItem('propertydata_trush');
    }
  }
  delProperty(url: string) {
    this.propertydata = this.propertydata.filter(p => p.url !== url);
    localStorage.setItem('propertydata_trush', JSON.stringify(this.propertydata));
  }
}
