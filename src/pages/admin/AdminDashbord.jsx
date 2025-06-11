import { useLoaderData } from 'react-router-dom';
import axios, { isAxiosError } from 'axios';
import AllOrders from '../../components/AllOrders';

export default function AdminDashboard() {
    const loadedOrders = useLoaderData();

    // useEffect(() => {
    //     const fetchOrders = async () => {
    //         try {
    //             setIsLoading(true);
    //             const response = await axios.get('http://localhost:8400/orders/all', 
    //                 { withCredentials: true }
    //             );

    //             if (response.status >= 200 && response.status < 300) {
    //                 setOrders(response.data);
    //                 setIsLoading(false);
    //             } else {
    //                 setError('Fetching orders failed.');
    //                 setIsLoading(false);
    //             }
    //         } catch (error) {
    //             console.error('Error', error);
    //             setIsLoading(false);
    //         }
    //     };

    //     if (user?.role === 'admin') {
    //         fetchOrders()
    //     };
    // }, [user]);

    const updateOrderStatus = async (orderId, status) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/orders/${orderId}`, 
                { status }, 
                { withCredentials: true } 
            );
            // setOrders(orders.map(o => o._id === orderId ? response.data : o));
        } catch (err) {
            alert('Failed to update order status');
        }
    };

    // if (user?.role !== 'admin') {
    //     return (
    //     <p>Access denied.</p>
    //   );
    // }

    return (
        <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">All Orders</h3>
            <AllOrders orders={loadedOrders} />
        </div>
    );
};

export async function loader() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/orders/all`, 
        { withCredentials: true }
        );

        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            throw new Response(JSON.stringify({ message: 'Could not fetch orders.'}), { status: 500 });
        }
    } catch (error) {
        const errorMessage = error.message || 'Server error. Please try again.';
        console.error('Error: ', errorMessage);
        // return { isAxiosError: true, message: 'Server error. Please try again.' };
        throw new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};

        // return { isAxiosError: true, message: 'Server error. Please try again.' };
// throw json({ message : 'Could not fetch orders.' }, { status: 500, });





// {orders.length === 0 ? (
//     <p className="text-gray-600">No orders yet.</p>
// ) : (
//     <div className="overflow-x-auto">
//         <table className="w-full bg-white shadow-md rounded-lg">
//             <thead className="bg-gray-200">
//                 <tr>
//                     <th className="p-4 text-left text-gray-700">Order ID</th>
//                     <th className="p-4 text-left text-gray-700">User</th>
//                     <th className="p-4 text-left text-gray-700">Services</th>
//                     <th className="p-4 text-left text-gray-700">Status</th>
//                     <th className="p-4 text-left text-gray-700">Actions</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {orders.map(order => (
//                     <tr key={order._id} className="border-t">
//                         <td className="p-4 text-gray-600">{order._id}</td>
//                         <td className="p-4 text-gray-600">{order.user.name}</td>
//                         <td className="p-4 text-gray-600">{order.services.join(', ')}</td>
//                         <td className="p-4 text-gray-600">{order.status}</td>
//                         <td className="p-4">
//                             <select
//                                 value={order.status}
//                                 onChange={(e) => updateStatus(order._id, e.target.value)}
//                                 className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             >
//                                 <option value="Pending">Pending</option>
//                                 <option value="Processing">Processing</option>
//                                 <option value="Delivered">Delivered</option>
//                             </select>
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     </div>
// )}