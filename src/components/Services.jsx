import residentialCleaningImg from '../assets/images/residential.jpg';
import commercialCleaningImg from '../assets/images/commercial.jpg';
import rugCleaningImg from '../assets/images/rug.jpg';
import dryCleaningImg from '../assets/images/laundry.jpg';

function CleaningServiceCategory({imgSrc, alt, heading, text}) {
    return (
      <div className='flex flex-col'>
        <div className='h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden shadow-md'>
          <img src={imgSrc} alt={alt} className='w-full h-full object-cover' />
        </div>
        <h2 className='mt-4 text-lg sm:text-xl md:text-2xl font-semibold text-gray-800'>
          {heading}
        </h2>
        <p className='mt-2 text-sm sm:text-base text-gray-600 leading-relaxed'>
          {text}
        </p>
      </div>
    )
}

export default function Services() {
  return (
    <article className='py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50'>
      <div className='max-w-7xl mx-auto text-center'>
        <h2 className='text-xs text-white bg-sky-700 inline-block px-3 py-1.5 rounded-full mb-4 tracking-wide uppercase'>
          Our Services
        </h2>
        <h3 className='text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800'>Our Cleaning Services</h3>
        <p className='text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mt-4 max-w-2xl mx-auto'>
          Whether it's a quick refresh or a deep clean transformation, our expert touch leaves your home or 
          office shining.
        </p>
      </div>

      <div className='max-w-7xl mx-auto mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
        <CleaningServiceCategory 
          imgSrc={residentialCleaningImg}
          alt="Residential cleaning service"
          heading='Residential Cleaning'
          text='General cleaning for homes, including dusting, vacuuming, mopping, and tidying up living areas, bedrooms, and kitchens.'
        />
        <CleaningServiceCategory 
          imgSrc={commercialCleaningImg}
          alt="Post-construction cleaning"
          heading='Commercial Cleaning'
          text='Cleaning office spaces, including desks, floors, break rooms, restrooms, and common areas to maintain a professional environment.'
        />
        {/* <CleaningServiceCategory 
          imgSrc={dryCleaningImg}
          heading='Post-Construction Cleaning'
          text='Removing dust, debris, and construction materials after renovation or new construction projects, leaving the space for ready use.'
        /> */}
        <CleaningServiceCategory 
          imgSrc={rugCleaningImg}
          alt="Carpet and upholstery cleaning"
          heading='Carpet and Upholstery Cleaning'
          text='Deep cleaning and stain removal from carpets, rugs, and upholstered furniture using specialized equipment.'
        />
        <CleaningServiceCategory 
          imgSrc={dryCleaningImg}
          alt="Laundry and dry cleaning service"
          heading='Laundry & Dry Cleaning Service'
          text='Specialized cleaning for properties being vacated or prepared for new occupants, focusing on removing dirt, stains, and residue.'
        />
      </div>
    </article>
  )
}
