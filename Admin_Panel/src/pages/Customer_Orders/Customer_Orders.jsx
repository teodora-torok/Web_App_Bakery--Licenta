import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Customer_Orders.css';

const Customer_Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/orders/all');
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, order_State: newStatus } : order
      )
    );

    try {
      await axios.patch(`http://localhost:8080/api/orders/status/${orderId}?status=${newStatus}`);
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="container mt-5">
      <div
        className="card p-4 myorders_card"
        style={{ backgroundColor: '#f1ede1', width: 'fit-content', minWidth: '100%' }}
      >
        <div className="mb-4 myorders">ALL ORDERS</div>

        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table className="table table_products" style={{ color: '#472f17' }}>
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>PRODUCT NAME</th>
                <th>TOTAL</th>
                <th>QUANTITY</th>
                <th>ORDER STATUS</th>
                <th>REFRESH</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <img
                      src={order.ordered_items[0]?.product_imageUrl || 'https://via.placeholder.com/48'}
                      height={55}
                      width={55}
                      alt="product"
                    />
                  </td>
                  <td>
                    {order.ordered_items.map((item, idx) => (
                      <span key={idx}>
                        {item.product_name}
                        {idx < order.ordered_items.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </td>
                  <td>RON {parseFloat(order.products_amount).toFixed(2)}</td>
                  <td>
                    {order.ordered_items.map((item, index) => (
                      <span key={index}>
                        {item.product_name} x{item.product_Quant}
                        {index < order.ordered_items.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </td>
                  <td>
                    <select
                      className="form-select"
                      value={order.order_State || 'Preparing'}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      style={{
                        backgroundColor: '#fbfbf5',
                        color: '#472f17',
                        borderColor: '#472f17',
                        position: 'relative',
                        zIndex: 1000,
                      }}
                    >
                      <option value="Preparing">Preparing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-warning" onClick={fetchOrders}>
                      <i className="bi bi-arrow-clockwise"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Customer_Orders;
