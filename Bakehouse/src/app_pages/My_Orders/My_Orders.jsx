import React, { useContext, useEffect, useState } from 'react';
import { ContextStore } from '../../context/Context_Store';
import axios from 'axios';
import './My_Orders.css';

const My_Orders = () => {
    const { token, Product_Quantity } = useContext(ContextStore);
    const [data, setData] = useState([]);

    const getOrders = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/orders", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            setData(response.data);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        }
    };

    useEffect(() => {
        if (token) {
            getOrders();
        }
    }, [token]);

    return (
        <div className="container mt-5">
            <div className="card p-4 myorders_card" style={{ backgroundColor: '#f1ede1', width: 'fit-content', minWidth: '100%' }}>
                <div className="mb-4 myorders">MY ORDERS</div>
                {data.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <table className="table table_products" style={{ color: '#472f17' }}>
                        <thead>
                            <tr>
                                <th style={{ color: '#472f17' }}>Product</th>
                                <th style={{ color: '#472f17' }}>Items</th>
                                <th style={{ color: '#472f17' }}>Total</th>
                                <th style={{ color: '#472f17' }}>Quantity</th>
                                <th style={{ color: '#472f17' }}>Status</th>
                                <th style={{ color: '#472f17' }}>Refresh</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((order) => (
                                <tr key={order.order_id}>
                                    <td style={{ color: '#472f17' }}>
                                        <div className="img-wrapper">
                                            <img
                                                src={order.ordered_items[0]?.product_imageUrl || "https://via.placeholder.com/48"}
                                                height={55}
                                                width={55}
                                                alt="product"
                                            />
                                        </div>
                                    </td>
                                    <td style={{ color: '#472f17' }}>
                                        {order.ordered_items.map((item, index) => {
                                            const text = `${item.product_name}`;
                                            return index === order.ordered_items.length - 1 ? text : text + ", ";
                                        })}
                                    </td>
                                    <td style={{ color: '#472f17' }}>
                                        RON {parseFloat(order.products_amount).toFixed(2)}
                                    </td>
                                    <td style={{ color: '#472f17' }}>
                                        {order.ordered_items.map((item, index) => {
                                            return (
                                                <span key={item.product_ID}>
                                                    {item.product_name} x{item.product_Quant}
                                                    {index < order.ordered_items.length - 1 ? ", " : ""}
                                                </span>
                                            );
                                        })}
                                    </td>

                                    <td className="fw-bold text-capitalize">
                                        <span style={{
                                            color:
                                                order.order_State === 'Preparing' ? '#ffc107' :
                                                    order.order_State === 'Shipped' ? '#0dcaf0' :
                                                        order.order_State === 'Delivered' ? '#198754' :
                                                            '#6c757d'
                                        }}>
                                            ● {order.order_State}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="btn btn-sm btn-warning" onClick={getOrders}>
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

export default My_Orders;
