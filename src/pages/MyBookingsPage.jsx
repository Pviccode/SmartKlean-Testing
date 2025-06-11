import { Link } from "react-router-dom";
import MyBookingsList from "../components/MyBookingsList";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

export default function MyBookingsPage() {
  const loadedBookings = useLoaderData();

  return <MyBookingsList bookings={loadedBookings} />
}

export async function myBookingsLoader() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/bookings`, 
      { withCredentials: true }
    );
    console.log('no', response);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Response(JSON.stringify({ message: 'Could not fetch bookings.'}), { status: 500 });
    }


  } catch (error) {
    const errorMessage = error.message || 'Server error. Please try again.';
    throw new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
  }
};
