import { Component, OnInit } from '@angular/core';
import { VendorService } from '../vendor.service';
import { Router } from '@angular/router';

interface Vendor {
  id: number;
  name: string;
  contact: string;
  address: string;
}

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css'],
})
export class VendorListComponent implements OnInit {
  vendors: Vendor[] = [];

  constructor(private vendorService: VendorService,private router: Router) {}

  ngOnInit(): void {
    this.fetchVendors();
  }

  fetchVendors() {
    this.vendorService.getVendors().subscribe((data) => {
      this.vendors = data;
    });
  }

  editVendor(id: string): void {
    this.router.navigate(['/edit-vendor', id]);  // Or whichever route you have for editing
  }

  deleteVendor(id: number) {
    this.vendorService.deleteVendor(id).subscribe(() => {
      this.fetchVendors(); // Refresh the list after deletion
    });
  }
}
