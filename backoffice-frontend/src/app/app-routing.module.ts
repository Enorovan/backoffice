import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'
import { DetailsProductComponent } from './details-product/details-product.component'
import { ManageStockComponent } from './manage-stock/manage-stock.component'
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'detailsProduit', component: DetailsProductComponent },
  { path: 'manageStock', component: ManageStockComponent },
  { path: 'history', component: HistoryComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
