const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

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
    date: row['Date']?.trim(),
    paymentMethod: row['Payment Method']?.trim(),
    orderStatus: row['Order Status']?.trim(),
    deliveryType: row['Delivery Type']?.trim(),
    storeId: row['Store ID']?.trim(),
    storeLocation: row['Store Location']?.trim(),
    salespersonId: row['Salesperson ID']?.trim(),
    employeeName: row['Employee Name']?.trim()
  };
};

const loadSalesData = () => {
  return new Promise((resolve, reject) => {
    const results = [];
    const csvPath = path.join(__dirname, '../data/sales_data.csv');

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => {
        results.push(parseCSVRow(row));
      })
      .on('end', () => {
        console.log(`✅ Loaded ${results.length} sales records`);
        resolve(results);
      })
      .on('error', reject);
  });
  };

module.exports = {
  loadSalesData
};