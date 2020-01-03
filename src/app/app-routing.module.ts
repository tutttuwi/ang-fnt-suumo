import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { PropertyHistoryComponent } from './property-history/property-history.component';
import { PropertyTrushComponent } from './property-trush/property-trush.component';
import { PropertyHelpComponent } from './property-help/property-help.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: '/property-list', pathMatch: 'full' },
      { path: 'property-list', component: PropertyListComponent, data: { animation: 'HomePage ' } },
      { path: 'property-detail/:id', component: PropertyDetailComponent, data: { animation: 'DetailPage' } },
      { path: 'property-history', component: PropertyHistoryComponent, data: { animation: 'HistoryPage' } },
      { path: 'property-trush', component: PropertyTrushComponent, data: { animation: 'TrushPage' } },
      { path: 'property-help', component: PropertyHelpComponent, data: { animation: 'AboutPage' } }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
