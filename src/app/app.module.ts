import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { PropertyHistoryComponent } from './property-history/property-history.component';
import { PropertyTrushComponent } from './property-trush/property-trush.component';
import { PropertyHelpComponent } from './property-help/property-help.component';

@NgModule({
  declarations: [
    AppComponent,
    PropertyListComponent,
    PropertyDetailComponent,
    PropertyHistoryComponent,
    PropertyTrushComponent,
    PropertyHelpComponent
  ],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
