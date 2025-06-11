
export default function AllOrders({ orders }) {
  return (
    <>
      { orders.length === 0 ? (
        <p className='text-gray-600'>No orders yet</p>
      ) : (
        <div className='overflow-x-auto'>
          <table>

            <thead>
              <tr>
                <th className="p-4 text-left text-gray-700">Order ID</th>
                <th className="p-4 text-left text-gray-700">User</th>
                <th className="p-4 text-left text-gray-700">Services</th>
                <th className="p-4 text-left text-gray-700">Status</th>
                <th className="p-4 text-left text-gray-700">Actions</th>
              </tr>
            </thead>

            <tbody>
              { orders.map( order => (
                <tr key={order._id}>
                  <td className="p-4 text-gray-600">{order._id}</td>
                  <td className="p-4 text-gray-600">{order.user.name}</td>
                  {/* <td className="p-4 text-gray-600">{order.services.join(', ')}</td> */}
                  <td className="p-4 text-gray-600">{order.status}</td>
                  <td>
                    <select
                      value={order.status}
                    //   onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))
              }
            </tbody>

          </table>
        </div>
      )
      }
    </>
  )
}
