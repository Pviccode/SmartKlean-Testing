import { NavLink } from "react-router-dom"

// Renders Login and Signup buttons for non-authenticated users.
export function AuthButtons({isMobile, onMobileMenuClose}) {
  return (
    <div className='space-x-3'>
      <NavLink 
        to='auth?mode=login' 
        className='text-center text-sky-800 border border-sky-800 hover:bg-sky-50
        hover:text-sky-900 transition py-2 px-4 rounded-md text-sm font-medium focus:outline-none
        focus:ring-2 focus:ring-sky-300'
        onClick={isMobile ? onMobileMenuClose : undefined}
      >
        Login
      </NavLink>
      <NavLink 
        to='auth?mode=signup' 
        className='text-center text-white bg-sky-800 hover:bg-sky-900
        transition py-2 px-4 rounded-md text-sm font-medium focus:outline-none
        focus:ring-2 focus:ring-sky-300'
        onClick={isMobile ? onMobileMenuClose : undefined}
      >
        Signup
      </NavLink>
    </div>
  )
}