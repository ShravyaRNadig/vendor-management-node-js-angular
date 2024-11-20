import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { VendorFormComponent } from './vendor-form/vendor-form.component';

const routes: Routes = [
  { path: '', component: VendorListComponent },
  { path: 'add-vendor', component: VendorFormComponent },
  { path: 'edit-vendor/:id', component: VendorFormComponent } // This is the route for editing vendors
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
