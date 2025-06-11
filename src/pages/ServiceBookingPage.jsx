import ServiceBookingForm from "../components/ServiceBookingForm";
import Footer from "../components/Footer";

export default function ServiceBookingPage() {
  return (
    <>
      <ServiceBookingForm method='post' />
      <Footer />
    </>
  )
}
