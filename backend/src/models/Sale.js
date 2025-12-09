// backend/src/models/Sale.js
const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  customerId: { type: String, required: true, index: true },
  customerName: { type: String, required: true, index: true },
  phoneNumber: { type: String, required: true, index: true },
  gender: { type: String, index: true },
  age: { type: Number, index: true },
  customerRegion: { type: String, index: true },
  customerType: String,
  
  productId: { type: String, required: true, index: true },
  productName: { type: String, required: true },
  brand: String,
  productCategory: { type: String, index: true },
  tags: String,
  
  quantity: { type: Number, required: true },
  pricePerUnit: { type: Number, required: true },
  discountPercentage: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  finalAmount: { type: Number, required: true },
  
  date: { type: Date, required: true, index: true },
  paymentMethod: { type: String, index: true },
  orderStatus: { type: String, index: true },
  deliveryType: String,
  
  storeId: String,
  storeLocation: String,
  salespersonId: String,
  employeeName: String
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Create indexes for efficient querying
saleSchema.index({ customerName: 'text', phoneNumber: 'text' }); // For text search
saleSchema.index({ date: -1 }); // For date sorting
saleSchema.index({ customerRegion: 1, gender: 1, productCategory: 1 }); // For filters

module.exports = mongoose.model('Sale', saleSchema);