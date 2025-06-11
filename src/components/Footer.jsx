import { IconMapPinFilled, IconMailFilled, IconPhoneFilled, IconClockHour4Filled, IconBrandX, IconBrandFacebook, IconBrandInstagram, IconBrandYoutube } from '@tabler/icons-react';
import brandLogo from '../assets/images/brand-logo.png';
import { Link } from 'react-router-dom';

function ListItems({text, reference}) {
    return (
      <div className='flex items-center gap-x-2 sm:gap-x-3 mb-4 sm:mb-5'>
        { reference === 'open-days' && <IconClockHour4Filled className='w-5 h-5 sm:w-6 sm:h-6 text-sky-400' /> }
        { reference === 'location' && <IconMapPinFilled className='w-5 h-5 sm:w-6 sm:h-6 text-sky-400' /> }
        { reference === 'mail' && <IconMailFilled className='w-5 h-5 sm:w-6 sm:h-6 text-sky-400' /> }
        { reference === 'mobile' && <IconPhoneFilled className='w-5 h-5 sm:w-6 sm:h-6 text-sky-400' /> }
        <p className='text-sm sm:text-base text-gray-400'>{text}</p>
      </div>
    )
}


const iconsPool = {
  twitter: IconBrandX,
  facebook: IconBrandFacebook,
  instagram: IconBrandInstagram,
  youtube: IconBrandYoutube,
};

export default function Footer() {
  const mediaLinks = [
    { to: "settings", icon: "twitter" },
    { to: "notifications", icon: "facebook" },
    { to: "payment", icon: "instagram" },
    { to: "bookings",  icon: "youtube" },
  ];

  return (
    <footer className='mt-8 sm:mt-12 lg:mt-16 bg-black'>
      <div 
        className='py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 
        sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-8 justify-items-center sm:justify-items-start'
      >
        <div className='w-full max-w-sm sm:col-span-2 lg:col-span-1'>
          <Link to='/' className='flex items-center space-x-2 mb-4 sm:mb-6'>
            <img src={brandLogo} alt="SmartKlean logo" className="h-7 sm:h-8 lg:h-10" />
            <p className='text-lg sm:text-xl lg:text-2xl font-bold text-white'>SmartKlean</p>
          </Link>

          <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-4 sm:mb-6">
            We are a team of passionate cleaning experts who take pride in delivering the highest standard
            of service. With years of experience in the industry, we've perfected our cleaning methods to ensure
            every job is done right
          </p>

          <div className='flex gap-2 sm:gap-3'>
            {mediaLinks.map( item  => {
                const IconComponent = iconsPool[item.icon];
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className='flex items-center justify-center p-3 sm:p-4 rounded-full 
                    hover:bg-gray-900 focus:bg-black/80 focus:outline-none focus:ring-2 
                    focus:ring-sky-400 transition'
                    aria-label={`Visit our ${item.icon} page`}
                  >
                    <IconComponent className='w-5 h-5 sm:w-6 sm:h-6 text-white' aria-hidden='true' />
                  </Link>
                )
              })
            }
          </div>
        </div>

        <div className='w-full max-w-sm'>
          <h2 className='mb-4 sm:mb-5 font-semibold text-white text-base sm:text-lg'>Company</h2>
          <div className='space-y-3 sm:space-y-4'>
            <Link 
              to='' 
              className='text-sm sm:text-base text-gray-400 hover:text-sky-400 
              focus:text-sky-400 transition block'
            >
              Home
            </Link>
            <Link 
              to='about'               
              className='text-sm sm:text-base text-gray-400 hover:text-sky-400 
              focus:text-sky-400 transition block'
            > 
              About
            </Link>
            <Link 
              to='services'               
              className='text-sm sm:text-base text-gray-400 hover:text-sky-400 
              focus:text-sky-400 transition block'
            >
              Services
            </Link>
            <Link 
              to='contact' 
              className='text-sm sm:text-base text-gray-400 hover:text-sky-400 
              focus:text-sky-400 transition block'
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className='w-full max-w-sm'>
          <h2 className='mb-4 sm:mb-5 font-semibold text-white text-base sm:text-lg'>Our Services</h2>
          <div className='space-y-3 sm:space-y-4'>
            <Link 
              to='' 
              className='text-sm sm:text-base text-gray-400 
             hover:text-sky-400 focus:text-sky-400 transition block'
            >
              Residential Cleaning
            </Link>
            <Link 
              to='' 
              className='text-sm sm:text-base text-gray-400 
             hover:text-sky-400 focus:text-sky-400 transition block'
            >
              Post-Construction Cleaning
            </Link>
            <Link 
              to='' 
              className='text-sm sm:text-base text-gray-400 
              hover:text-sky-400 focus:text-sky-400 transition block'
            >
              Carpet and Upholstery Cleaning
            </Link>
            <Link 
              to='' 
              className='text-sm sm:text-base text-gray-400 
              hover:text-sky-400 focus:text-sky-400 transition block'
            >
              Laundry and Dry Cleaning Service
            </Link>
          </div>
        </div>

        <div className='w-full max-w-sm'>
          <h2 className='mb-4 sm:mb-5 font-semibold text-white text-base sm:text-lg'>Contact</h2>
          <ListItems text='We are open Monday - Saturday' reference='open-days' />
          <ListItems text='66 Road Brooklyn Street' reference='location' />
          <ListItems text='needhelp@company.com' reference='mail' />
          <ListItems text='+23409048827636' reference='mobile' />   
        </div>

      </div>

      <div className='py-4 sm:py-5 px-4 sm:px-6 bg-sky-400 flex items-center justify-center'>
        <p className='text-sm sm:text-base font-semibold'>Copyright © {new Date().getFullYear()} Torpiccode | Powered by Torpiccode</p>
      </div>
    </footer>
  )
}
