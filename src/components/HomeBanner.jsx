import { Link } from "react-router-dom";
import bannerImg from '../assets/images/main-banner.jpg';

export default function HomeBanner() {
  return (
    <section>
      <div 
        style={{ backgroundImage: `url(${bannerImg})` }} 
        className='w-full bg-cover bg-no-repeat min-h-screen bg-center relative'
      >
        {/* dark overlay for the entire background */}
        <div className="absolute inset-0 min-h-screen bg-black opacity-50"></div>

        {/* Text container */}
        <div className='relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4 sm:px-6'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center drop-shadow-md animate-fade-in'>
            Exceptional Cleanliness, <br/>Guarenteed Satisfaction
          </h1>
          <p className='text-base sm:text-lg md:text-xl text-center mt-4 sm:mt-6 px-2 sm:px-8 max-w-2xl drop-shadow-md'>
            Enjoy a spotless space with our expert cleaning team. Affordable, eco-friendly, 
            and tailored to your needs!
          </p>
          <div className='mt-6 sm:mt-8'>
            <Link
              to='service-booking' 
              className='inline-block bg-sky-700 text-white py-2 px-4 sm:py-3 sm:px-6 rounded-full font-semibold
              text-sm sm:text-base hover:bg-sky-800 transition drop-shadow-md focus:outline-none 
              focus:ring-2 focus:ring-sky-300'
            >
              Book Cleaning service
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
