import { Link } from "react-router-dom";
import { formatDate } from "../util/inputValidation";

function BookingCard ({ booking }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full text-gray-800">
      <div className="flex flex-col gap-2 text-sm sm:text-base">
        <span className="text-gray-800"><strong>Booking ID:</strong> #{booking._id}</span>
        <span className="text-gray-800"><strong>Date:</strong> {formatDate(booking.selectedDate)}</span>
        <span className="text-gray-800"><strong>Service:</strong> {booking.services}</span>
        <span className="text-gray-800"><strong>Status:</strong> 
          {/* <span className={booking.status === 'Confirmed' ? 'text-green-600' : 'text-yellow-600'}> */}
            {/* {booking.status} */}
          {/* </span> */}
        </span>
      </div>
      <div className="flex gap-2 w-full sm:w-auto">
          <Link to={`edit-booking/${booking._id}`} className="bg-amber-300 text-white py-2 px-4 rounded-full font-semibold text-sm sm:text-base hover:bg-amber-400 transition drop-shadow-md focus:outline-none focus:ring-2 focus:ring-sky-300 w-full sm:w-auto">
            Edit
          </Link>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-full font-semibold text-sm sm:text-base hover:bg-red-600 transition drop-shadow-md focus:outline-none focus:ring-2 focus:ring-sky-300 w-full sm:w-auto"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default function MyBookingsList({bookings}) {
  return (
    <article className='py-12 sm:py-16 md:py-20 bg-sky-800 text-white px-4 sm:px-6 lg:px-8'>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-6 sm:mb-8">All My Bookings</h1>
        <div className="grid grid-cols-2 gap-4">
          {bookings.map( booking => (
            <BookingCard 
              key={booking._id}
              booking={booking}
            />
          ))}
        </div>
      </div>
    </article>
  )
}
