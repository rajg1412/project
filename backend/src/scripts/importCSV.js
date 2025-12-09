// backend/src/scripts/importCSV.js
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const Sale = require('../models/Sale');

const parseCSVRow = (row) => {
  return {
    customerId: row['Customer ID']?.trim(),
    customerName: row['Customer Name']?.trim(),
    phoneNumber: row['Phone Number']?.trim(),
    gender: row['Gender']?.trim(),
    age: parseInt(row['Age']) || 0,
    customerRegion: row['Customer Region']?.trim(),
    customerType: row['Customer Type']?.trim(),
    
    productId: row['Product ID']?.trim(),
    productName: row['Product Name']?.trim(),
    brand: row['Brand']?.trim(),
    productCategory: row['Product Category']?.trim(),
    tags: row['Tags']?.trim(),
    
    quantity: parseInt(row['Quantity']) || 0,
    pricePerUnit: parseFloat(row['Price per Unit']) || 0,
    discountPercentage: parseFloat(row['Discount Percentage']) || 0,
    totalAmount: parseFloat(row['Total Amount']) || 0,
    finalAmount: parseFloat(row['Final Amount']) || 0,
    
    date: new Date(row['Date']?.trim()),
    paymentMethod: row['Payment Method']?.trim(),
    orderStatus: row['Order Status']?.trim(),
    deliveryType: row['Delivery Type']?.trim(),
    
    storeId: row['Store ID']?.trim(),
    storeLocation: row['Store Location']?.trim(),
    salespersonId: row['Salesperson ID']?.trim(),
    employeeName: row['Employee Name']?.trim()
  };
};

const importCSV = async () => {
  try {
    // Connect to MongoDB
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('🗑️  Clearing existing data...');
    await Sale.deleteMany({});
    console.log('✅ Existing data cleared');

    // Read and import CSV
    const csvPath = path.join(__dirname, '../data/sales_data.csv');
    console.log('📂 Reading CSV from:', csvPath);

    const results = [];
    
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => {
        results.push(parseCSVRow(row));
      })
      .on('end', async () => {
        console.log(`📊 Parsed ${results.length} records from CSV`);
        
        try {
          // Insert data in batches for better performance
          console.log('💾 Inserting data into MongoDB...');
          const batchSize = 1000;
          
          for (let i = 0; i < results.length; i += batchSize) {
            const batch = results.slice(i, i + batchSize);
            await Sale.insertMany(batch, { ordered: false });
            console.log(`   Inserted ${Math.min(i + batchSize, results.length)}/${results.length} records`);
          }
          
          console.log('✅ All data imported successfully!');
          console.log(`📊 Total records in database: ${await Sale.countDocuments()}`);
          
          process.exit(0);
        } catch (error) {
          console.error('❌ Error inserting data:', error);
          process.exit(1);
        }
      })
      .on('error', (error) => {
        console.error('❌ Error reading CSV:', error);
        process.exit(1);
      });
      
  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  }
};

// Run the import
importCSV();