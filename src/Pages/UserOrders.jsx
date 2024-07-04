import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';
import './CSS/UserOrders.css';

const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const { user,id } = useContext(UserContext);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (user && id) {
                    const response = await axios.get(`https://localhost:7286/Order/getOrders`, {
                        params: { userId: id }
                    });
                    setOrders(response.data);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
    
        fetchOrders();
    }, [user, id]);
    

    if (!user) {
        return <div>Please log in to view your orders.</div>;
    }

    return (
        <div className="user-orders">
            <h1>Your Orders</h1>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map(order => (
                    <div key={order.id} className="order">
                        <h2>Order ID: {order.id}</h2>
                        <p>Name: {order.name}</p>
                        <p>Address: {order.address}</p>
                        <p>Email: {order.email}</p>
                        <p>Phone: {order.phone}</p>
                        <h3>Items:</h3>
                        {order.items && order.items.length > 0 && (
                            <ul>
                                {order.items.map(item => (
                                    <li key={item.productId}>
                                        {item.productName} - {item.quantity} x {item.price} $
                                        {item.flavour && ` (${item.flavour})`}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default UserOrders;
