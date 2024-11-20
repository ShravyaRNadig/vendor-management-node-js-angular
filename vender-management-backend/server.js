const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(express.json());

// Path to the vendors data file
const vendorsFilePath = './data/vendors.json';

// Function to read the vendors data from the JSON file
const readVendorsData = () => {
    try {
        const data = fs.readFileSync(vendorsFilePath);
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

// Function to write the vendors data to the JSON file
const writeVendorsData = (vendors) => {
    try {
        fs.writeFileSync(vendorsFilePath, JSON.stringify(vendors, null, 2));
    } catch (err) {
        console.error('Error writing to file', err);
    }
};

// GET: Retrieve all vendors
app.get('/vendors', (req, res) => {
    const vendors = readVendorsData();
    res.json(vendors);
});

// POST: Add a new vendor
app.post('/vendors', (req, res) => {
    const { name, contact, address } = req.body;

    if (!name || !contact || !address) {
        return res.status(400).json({ message: 'Name, contact, and address are required' });
    }

    const vendors = readVendorsData();
    const newVendor = {
        id: vendors.length + 1,
        name,
        contact,
        address
    };
    
    vendors.push(newVendor);
    writeVendorsData(vendors);
    res.status(201).json(newVendor);
});

// PUT: Update a vendor by ID
app.put('/vendors/:id', (req, res) => {
    const { id } = req.params;
    const { name, contact, address } = req.body;

    const vendors = readVendorsData();
    const vendorIndex = vendors.findIndex(vendor => vendor.id === parseInt(id));

    if (vendorIndex === -1) {
        return res.status(404).json({ message: 'Vendor not found' });
    }

    vendors[vendorIndex] = { ...vendors[vendorIndex], name, contact, address };
    writeVendorsData(vendors);
    res.json(vendors[vendorIndex]);
});

// DELETE: Delete a vendor by ID
app.delete('/vendors/:id', (req, res) => {
    const { id } = req.params;

    const vendors = readVendorsData();
    const vendorIndex = vendors.findIndex(vendor => vendor.id === parseInt(id));

    if (vendorIndex === -1) {
        return res.status(404).json({ message: 'Vendor not found' });
    }

    const deletedVendor = vendors.splice(vendorIndex, 1);
    writeVendorsData(vendors);
    res.json(deletedVendor);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
