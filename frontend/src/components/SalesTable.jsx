import React from 'react';
import { formatCurrency, formatDate } from '../utils/formatters';

function SalesTable({ data }) {
  return (
    <div className="table-container">
      <table className="sales-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer</th>
            <th>Phone</th>
            <th>Product</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price/Unit</th>
            <th>Discount</th>
            <th>Final Amount</th>
            <th>Payment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr key={index}>
              <td>{formatDate(record.date)}</td>
              <td>
                <div className="customer-cell">
                  <div className="customer-name">{record.customerName}</div>
                  <div className="customer-detail">{record.customerRegion}</div>
                </div>
              </td>
              <td>{record.phoneNumber}</td>
              <td>
                <div className="product-cell">
                  <div className="product-name">{record.productName}</div>
                  <div className="product-brand">{record.brand}</div>
                </div>
              </td>
              <td>{record.productCategory}</td>
              <td className="quantity-cell">{record.quantity}</td>
              <td>{formatCurrency(record.pricePerUnit)}</td>
              <td className="discount-cell">{record.discountPercentage}%</td>
              <td className="amount-cell">{formatCurrency(record.finalAmount)}</td>
              <td>{record.paymentMethod}</td>
              <td>
                <span className={`status-badge status-${record.orderStatus?.toLowerCase()}`}>
                  {record.orderStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesTable;