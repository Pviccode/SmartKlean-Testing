import ServiceBookingForm from "../components/ServiceBookingForm";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

export default function EditServiceBookingPage() {
  const data = useLoaderData();

  return (
    <ServiceBookingForm method='patch' bookingData={data} />
  )
}

export async function bookingDetailLoader({params}) {
    const bookingId = params.bookingId;

    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/bookings/${bookingId}`, 
            { withCredentials: true }
        );
        console.log('why', response)

        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            throw new Response(JSON.stringify({ message: 'Could not fetch details for selected booking.'}), { status: 500 });
        }
    } catch (error) {
        
    }
}
