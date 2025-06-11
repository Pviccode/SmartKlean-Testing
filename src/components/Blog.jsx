import { Link } from 'react-router-dom';
import { IconCaretRightFilled } from '@tabler/icons-react';
import newsCardOneImg from '../assets/images/news-img1.jpg';
import newsCardTwoImg from '../assets/images/news-img2.jpg';
import newsCardThreeImg from '../assets/images/news-img3.jpg';

function NewsCard({bgImgSrc, postDate, newsHeading, numOfComments}) {
  return (
    <div className='w-full max-w-sm rounded-lg shadow-md bg-white'>
      <div 
        className='relative w-full bg-cover bg-no-repeat bg-center h-48 sm:h-64' 
        style={{ backgroundImage: `url(${bgImgSrc})` }}
        aria-label={`Background image for ${newsHeading}`}
      >
        {/* dark overlay for the entire background */}
        <div className="absolute inset-0 h-full bg-black opacity-40"></div>

        {/* Text container */}
        <div 
          className='relative z-10 flex flex-col items-center justify-center h-full w-full 
          text-white px-4 sm:px-6'
        >
          <div className='text-center'>
            <p className='font-bold text-cyan-400 text-sm sm:text-base mb-4 sm:mb-6 drop-shadow-md'>{postDate}</p>
            <p className='border-t border-white text-sm sm:text-base pt-3 sm:pt-4 px-4 drop-shadow-md'>
              {numOfComments} {numOfComments === 1 ? 'comment' : 'comments'}
            </p>
          </div>
        </div>
      </div>

      <div className='py-6 sm:py-8 px-4 sm:px-6'>
        <h2 className='font-bold text-lg sm:text-xl text-gray-800 mb-4 truncate'>{newsHeading}</h2>
        <div className='flex items-center gap-x-2'>
          <Link 
            to="" 
            className='text-sky-800 font-medium text-sm sm:text-base hover:text-sky-900 
            focus:text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-800 transition'
          >
            Read More
          </Link>
          <IconCaretRightFilled className='w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5' />
        </div>
      </div>
    </div>
  )
}

export default function Blog() {
  return (
    <article className='py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
      <header className="text-center">
        <h2 className='font-medium text-xl sm:text-2xl text-gray-400 mb-2'>Latest News & Articles</h2>
        <div className='border-b-2 sm:border-b-4 border-amber-500 w-16 sm:w-20 mx-auto'></div>
      </header>

      <div 
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10
        mt-8 sm:mt-12 lg:mt-16 justify-items-center'
      >
        <NewsCard 
          bgImgSrc={newsCardOneImg} 
          postDate='June 14, 2025' 
          newsHeading='The Art of Folding: Transform Your Laundry into Neatness' 
          numOfComments={2}
        />
        <NewsCard 
          bgImgSrc={newsCardTwoImg} 
          postDate='May 17, 2025' 
          newsHeading='Efficient Laundry Hacks for Busy Lifestyles' 
          numOfComments={0} 
        />
        <NewsCard 
          bgImgSrc={newsCardThreeImg} 
          postDate='October 30, 2025' 
          newsHeading='Emergency Stain Rescue: A Quick Guide to Stain Removal' 
          numOfComments={5} 
        />
      </div>
    </article>
  )
}
