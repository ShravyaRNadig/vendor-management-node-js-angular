import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the interface for an existing vendor with the 'id' (required for update operations)
export interface Vendor {
  id: number;
  name: string;
  contact: string;
  address: string;
}

// Define the interface for a new vendor, where 'id' is not required (for add operations)
export interface VendorWithoutId {
  name: string;
  contact: string;
  address: string;
}

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  private apiUrl = 'http://localhost:3000/vendors'; // Your Node.js API URL

  constructor(private http: HttpClient) {}

  // Get all vendors
  getVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.apiUrl);
  }

  // Add a new vendor (expects VendorWithoutId)
  addVendor(vendor: VendorWithoutId): Observable<Vendor> {
    return this.http.post<Vendor>(this.apiUrl, vendor);
  }

  // Update an existing vendor (expects Vendor)
  updateVendor(id: number, vendor: Vendor): Observable<Vendor> {
    return this.http.put<Vendor>(`${this.apiUrl}/${id}`, vendor);
  }

  // Delete a vendor
  deleteVendor(id: number): Observable<Vendor> {
    return this.http.delete<Vendor>(`${this.apiUrl}/${id}`);
  }
}
