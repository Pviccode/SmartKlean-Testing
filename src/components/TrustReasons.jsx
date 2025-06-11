import { IconCircleCheckFilled } from "@tabler/icons-react";

function Reason({text}) {
    return (
      <div className='flex items-start gap-x-3 sm:gap-x-4 animate-fade-in'>
        <IconCircleCheckFilled 
          className='text-amber-300 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 mt-1' 
          aria-hidden='true'
        />
        <p className='text-white text-sm sm:text-base md:text-lg leading-relaxed'>{text}</p>
      </div>
    )
}

export default function TrustReasons() {
  return (
    <article className='px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20'>
      <div className='max-w-7xl mx-auto bg-sky-700 rounded-xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12'>
        <h2 className='text-white text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 sm:mb-8'>
          Top Six Reasons to Trust Us
        </h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
          <Reason
            text='Our experienced staff deliver impeccable results with attention to detail'
          />
          <Reason 
            text='We tailor our services to meet your unique needs and preferences.'
          />
          <Reason 
            text='Safe and sustainable cleaning solutions for home and environment.'
          />
          <Reason 
            text='Punctual, dependable, and fully vetted professionals you can trust.'
          />
          <Reason 
            text="We're not done until you're happy - your guaranteed satisfaction is our priority."
          />
          <Reason 
            text='Transparent pricing that fits your budget, with no surprises.'
          />
      </div>
      </div>
    </article>
  )
}
