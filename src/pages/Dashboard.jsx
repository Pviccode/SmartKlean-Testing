// import { useEffect, useState, useContext } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../contexts/AuthContext";
// import axios from 'axios';

// export default function Dashboard() {
//     const { user, isChecking } = useContext(AuthContext);
//     const [orders, setOrders] = useState([]);

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8400/orders', 
//                     { withCredentials: true }
//                 );
//                 setOrders(response.data); 
//             } catch (error) {
//                 console.error(error);
//             }
//         }
//         fetchOrders();
//     }, []);

//     if (!isChecking) {
//         return (
//             <div className='max-w-4xl mx-auto'>
//                 <h2 className='text-2xl font-bold text-gray-800 mb-6'>Welcome, {user?.name}</h2>
//                 <h3 className='text-xl font-semibold text-gray-700 mb-4'>Your Orders</h3>
//                 {
//                     orders.length === 0 ? (
//                         <p className='text-gray-600'>No orders yet.</p>
//                     ) : (
//                         <div className='grid gap-4'>
//                             {
//                                 orders.map(order => (
//                                     <div key={order._id} className='bg-white p-4 rounded-lg shadow-md'>
//                                         <p className='text-gray-700'><strong>Order ID:</strong>{order._id}</p>
//                                         <p className='text-gray-700'><strong>Status:</strong>{order.status}</p>
//                                         <p className='text-gray-700'><strong>Total:</strong>{order.totalPrice}</p>
//                                     </div>
//                                 ))
//                             }
//                         </div>
//                     )
//                 }
//                 <Link 
//                     to="/order"
//                     className='inline-block mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition'
//                 >
//                     Place New Order
//                 </Link>
//             </div>
//         )
//     }
// }
 