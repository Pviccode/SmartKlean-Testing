import { Link } from 'react-router-dom';
import aboutImg1 from '../assets/images/about1.jpg';
import aboutImg2 from '../assets/images/about2.jpg';
import aboutImg3 from '../assets/images/about3.jpg';
import aboutImg4 from '../assets/images/about4.jpg';

function ImgContainer({imgSrc, alt, size}) {
    return (
      <div 
        className={`w-full rounded-lg overflow-hidden transform hover:scale-105 transition ${
          size === 'short' ? 'h-36 sm:h-48 md:h-56' : 'h-60 sm:h-72 md:h-80'
          }`
        }
      >
        <img src={imgSrc} alt={alt} className='w-full h-full object-cover' />
      </div>
    )
}

export default function About() {
  return (
    <article className='py-12 sm:py-16 md:py-20 bg-sky-800 text-white px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
        {/* Text section */}
        <div>
          <h2 className='text-xs bg-sky-700 inline-block px-3 py-1.5 rounded-full mb-4 tracking-wide uppercase'>
            About Smartklean
          </h2>
          <h3 className='text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight'>
            Bringing Clean,<br/> Comfort, and Care<br/> Together
          </h3>
          <p className='text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed mt-4 sm:mt-6 max-w-lg'>
            We are a team of passionate cleaning experts who take pride in delivering the highest standard of service.
            With years of experience in the industry, we've perfected our cleaning methods to ensure every job is done right.
          </p>
          <div className='mt-6 sm:mt-8'>
            <Link 
              className='inline-block bg-amber-300 text-white py-2 px-4 sm:py-3 sm:px-6 rounded-full
              font-semibold text-sm sm:text-base hover:bg-amber-400 transition drop-shadow-md 
              focus:outline-none focus:ring-2 focus:ring-sky-300'
            >
              Book Service Now
            </Link>
          </div>
        </div>

        {/* Images section */}
        <div className='mt-8 lg:mt-0 grid grid-cols-2 gap-4'>
          <ImgContainer imgSrc={aboutImg1} alt='Team cleaning a home' size='short' />
          <ImgContainer imgSrc={aboutImg2} alt='Eco-friendly cleaning products' size='tall' />
          <ImgContainer imgSrc={aboutImg3} alt='Satisfied customer' size='tall' />
          <ImgContainer imgSrc={aboutImg4} alt='Professional cleaning equipment' size='short' />
        </div>
      </div>
    </article>
  )
}
