import { Component, OnInit } from '@angular/core';
import { VendorService, Vendor, VendorWithoutId } from '../vendor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.css'],
})
export class VendorFormComponent implements OnInit {
  vendor: VendorWithoutId = { name: '', contact: '', address: '' }; // Initialize as VendorWithoutId for new vendor
  isUpdate = false;
  vendorId?: number; // To store the ID of the vendor when updating

  constructor(
    private vendorService: VendorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Check if we are editing an existing vendor
    const vendorId = this.route.snapshot.paramMap.get('id');
    if (vendorId) {
      this.isUpdate = true;
      this.vendorId = Number(vendorId);
      this.fetchVendor(this.vendorId);
    }
  }

  fetchVendor(id: number): void {
    this.vendorService.getVendors().subscribe((vendors) => {
      const vendorToEdit = vendors.find((vendor) => vendor.id === id);
      if (vendorToEdit) {
        this.vendor = { 
          name: vendorToEdit.name, 
          contact: vendorToEdit.contact, 
          address: vendorToEdit.address 
        }; // Populate form with vendor data
      }
    });
  }

  // Method to add a new vendor
  addVendor(): void {
    this.vendorService.addVendor(this.vendor).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  // Method to update an existing vendor
  updateVendor(): void {
    if (this.vendorId) {
      // Create the Vendor object with id (required for update)
      const vendorToUpdate: Vendor = {
        id: this.vendorId, // Add the id from route param
        ...this.vendor, // Add other fields from the form
      };

      this.vendorService.updateVendor(vendorToUpdate.id, vendorToUpdate).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
