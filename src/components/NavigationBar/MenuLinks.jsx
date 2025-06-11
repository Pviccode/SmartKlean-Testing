import { IconChevronRight } from "@tabler/icons-react";
import { NavLink, Link } from "react-router-dom";

// Renders a navigation link in the mobile menu.
export function MobileMenuLink({text, to, onClose}) {
  return (
    <div className='flex items-center justify-between py-2 px-2'>
      <Link 
        to={to} 
        className='block text-lg sm:text-xl font-semibold text-gray-800 hover:text-sky-800 transition'
        onClick={onClose}
      >
        {text}
      </Link>
      <IconChevronRight className='text-sky-800 w-5 h-5' aria-hidden='true' />
    </div>
  )
}

// Renders a navigation link for the desktop menu.
export function DesktopMenuLink({text, to}) {
  return (
    <NavLink 
      to={to} 
      className={({isActive}) => 
        `text-gray-800 hover:text-sky-800 transition text-sm lg:text-base font-medium ${
          isActive ? 'text-sky-800 border-b-2 border-amber-400' : ''
        }`
      }
      end 
    >
      {text}
    </NavLink>
  )
}