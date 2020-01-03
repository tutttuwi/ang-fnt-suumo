import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Property } from '../property/property';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.sass']
})
export class PropertyDetailComponent implements OnInit {
  id: number;
  property: Property;
  propertydata: Property[] = [];
  constructor(private localtion: Location, private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.propertydata = JSON.parse(localStorage.getItem('propertydata'));
    this.property = this.propertydata.find((v, i) => {
      if (v.id === this.id) {
        return v;
      }
    });
  }

  backToList() {
    this.localtion.back();
  }
}
