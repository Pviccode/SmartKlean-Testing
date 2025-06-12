import { useState, useEffect, useRef } from "react";
import { Link, useRouteLoaderData } from "react-router-dom";
import { IconMenu3, IconX, IconCaretRightFilled, IconCaretLeftFilled } from "@tabler/icons-react";
import brandLogo from '../../assets/images/brand-logo.png';
import { MobileMenuLink, DesktopMenuLink } from "./MenuLinks";
import { DesktopProfileMenu, MobileProfileMenu } from "./ProfileMenu";
import { AuthButtons } from "./AuthButtons";

export default function Navbar() {
    const { auth } = useRouteLoaderData('root');   // Authentication data (e.g isAuthenticated, user.name) from the root route.
    const [isOpen, setIsOpen] = useState(false);  // Tracks whether the primary mobile menu is open.
    const [isDesktopProfileMenuOpen, setIsDesktopProfileMenuOpen] = useState(false);  // Tracks whether the desktop dropdown profile menu is open
    const [isMobileProfileMenuOpen, setIsMobileProfileMenuOpen] = useState(false);  // Tracks whether the secondary mobile profile menu is open.
    const profileRef = useRef(null);     // References the profile dropdown container for click-outside detection and focus.

    // Handle secondary mobile profile menu toggle
    const toggleMobileProfileMenu = () => {
      setIsMobileProfileMenuOpen(!isMobileProfileMenuOpen);
    };

    // Function to toggle mobile menu
    const toggleMobileMenu = () => {
      setIsOpen(!isOpen);
    };

    // Function to close mobile menu
    const closeMobileMenu = () => {
      setIsOpen(false);
    };

    // Extracts the first two initials from the logged-in user’s name (e.g., “John Doe” → “JD”) or defaults to “U”.
    const userInitials = auth?.isAuthenticated 
      ? 
        `${auth?.user?.firstName} ${auth?.user?.lastName}`   // Combine first name and last name
        .trim()
        .split(' ')
        .filter(n => n)
        .map((n) => n[0])
        .slice(0, 2)
        .join('') || 'U'
      : 
        'U';

    // Closes the desktop profile dropdown/menu on outside clicks or Escape key press.
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsDesktopProfileMenuOpen(false);
            }
        }

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
                setIsDesktopProfileMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
          document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    // Prevents body scrolling when the mobile menu is open and closes the menu on desktop-sized screens (>=768px).
    useEffect(() => {

        // Prevent body scrolling when mobile menu is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        // Close mobile menu when screen resizes to desktop size
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };

        // Add resize event listener
        window.addEventListener('resize', handleResize);

        // Call resize event handler function immediately to handle initial state
        handleResize();

        return () => {
            document.body.style.overflow = '';    // Reset scroll
            window.removeEventListener('resize', handleResize);  // Remove resize listener
        }
    }, [isOpen]);


  return (
    <>
      <nav className='w-full fixed top-0 bg-white shadow-md z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center'>
          {/* Logo section */}
          <Link to='/' className='flex items-center space-x-2'>
            <img src={brandLogo} alt="SmartKlean logo" className="h-8 sm:h-10" />
            <p className='text-xl sm:text-2xl font-bold text-gray-800'>SmartKlean</p>
          </Link>

          {/* Hamburger menu button for smaller screens */}
          <div className='md:hidden'>
            <button
                onClick={toggleMobileMenu}
                aria-controls='mobile-menu'
                aria-expanded={isOpen}
            >
              <span className='sr-only'>Open main menu</span>
              {
                !isOpen ? <IconMenu3 className="w-6 h-6" /> : null
              }
            </button>
          </div>
            
          {/* Navigation Menu for larger screens */}
          <div className='hidden md:flex items-center space-x-4 lg:space-x-6'>
            <DesktopMenuLink text='Home' to='' end={true} />
            <DesktopMenuLink text='About' to='about' />
            <DesktopMenuLink text='Services' to='services' />
            <DesktopMenuLink text='Contact Us' to='contact' />

            {
              !auth?.isAuthenticated && (
                <AuthButtons isMobile={false} />
              )
            }
            {
              auth?.isAuthenticated && (
                <div 
                  className='relative cursor-pointer' 
                  ref={profileRef}
                  onMouseEnter={() => setIsDesktopProfileMenuOpen(true)}
                >
                  <div 
                    className={`rounded-md hover:bg-sky-100 cursor-pointer py-1 px-2 
                      ${isDesktopProfileMenuOpen ? 'bg-sky-100' : ''}`
                    }
                  >
                    <button
                      className='flex items-center justify-center w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-sky-800
                    text-white text-sm font-medium cursor-pointer'
                      aria-expanded={isDesktopProfileMenuOpen}
                      onClick={() => setIsDesktopProfileMenuOpen(true)}  // Click support
                    >
                      {userInitials}
                    </button>
                  </div>

                  {isDesktopProfileMenuOpen && (
                     <DesktopProfileMenu 
                        onLogout={() => setIsDesktopProfileMenuOpen(false)}
                        closeMenu={() => setIsDesktopProfileMenuOpen(false)}
                        userInitials={userInitials}
                        userData={auth?.user}
                      />
                    )
                  }
                </div>
              )
            }
          </div>
        </div>
      </nav>

      {/* Navigation menu for smaller screens */}
      { isOpen && (
          <div 
            id="mobile-menu" 
            className='md:hidden fixed inset-0 z-50 flex transition-opacity duration-300'
          >
            {/* Semi-transparent backdrop */}
            <div 
              className='bg-black opacity-60 absolute inset-0' 
              onClick={toggleMobileMenu}
              aria-hidden="true"
            ></div>

            {/* Close button on backdrop */}
            <button 
              onClick={toggleMobileMenu}
              className="absolute top-4 right-4 z-60 flex items-center justify-center w-12 h-12 
              rounded-full bg-white shadow-md hover:bg-gray-100 focus:bg-gray-100 
              focus:outline-none focus:ring-2 focus:ring-white transition-colors"
              aria-label="Close main menu"
            >
              <span className='sr-only'>Close main menu</span>
              <IconX className='w-6 h-6 text-gray-900' />
            </button>               

            {/* Menu content */}
            <div 
              className='relative w-3/4 max-w-sm bg-white pb-8 transform transition-transform 
              duration-300 ease-in-out translate-x-0'
            >
              <div>
                {auth?.isAuthenticated ? (
                  <div 
                    className='flex justify-between bg-gray-50 px-4 sm:px-6 py-3 sm:py-4'
                    onClick={toggleMobileProfileMenu}
                  >
                    <div className='flex gap-x-2 sm:gap-x-3 max-w-[60%] items-center'>
                      <div>
                        <button
                          className='relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14
                          rounded-full bg-sky-800 text-white text-lg sm:text-xl font-bold 
                          cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-700'
                          aria-expanded={isMobileProfileMenuOpen}
                        >
                          {userInitials}
                        </button>
                      </div>
                      <div className='flex flex-col justify-between'>
                        <p className='leading-5 font-bold text-sm sm:text-base'>Hi, {auth?.user?.firstName} {auth?.user?.lastName}</p>
                        <p className='text-xs sm:text-sm'>Welcome back</p>
                      </div>
                    </div>
                    <div className='flex items-center'>
                      <IconCaretRightFilled className="w-5 h-5" />
                    </div>
                  </div>
                 ) : (
                  <div className='flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4'>
                    <Link to="/" className="flex items-center space-x-2" onClick={toggleMobileMenu}>
                      <img src={brandLogo} alt="SmartKlean logo" className="h-8" />
                      <p className="text-xl font-bold text-gray-800">SmartKlean</p>
                    </Link>
                  </div>
                 )
                }

                <div className='mt-4 sm:mt-6 space-y-4 mb-8 px-4 sm:px-6'>
                  <MobileMenuLink text='Home' to='' onClose={closeMobileMenu} />
                  <MobileMenuLink text='About' to='about' onClose={closeMobileMenu} />
                  <MobileMenuLink text='Services' to='services' onClose={closeMobileMenu} />
                  <MobileMenuLink text='Contact Us' to='contact' onClose={closeMobileMenu} />
                </div>
                {
                  !auth?.isAuthenticated && (
                    <div className='px-4 sm:px-6'>
                      <AuthButtons isMobile={true} onMobileMenuClose={closeMobileMenu} />
                    </div>
                  )
                }
              </div>
            </div>

            {/* Secondary profile menu */}
            {isMobileProfileMenuOpen && (
              <div
                id='profile-menu'
                className={`absolute w-3/4 max-w-sm bg-white pb-8 
                transform transition-transform duration-300 ease-in-out z-70 ${
                  isMobileProfileMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
                ref={profileRef}
                tabIndex={-1}
              >
                <div
                  className="flex items-center px-4 sm:px-6 py-3 sm:py-4 bg-gray-50"
                  onClick={() => setIsMobileProfileMenuOpen(false)}
                >
                  <IconCaretLeftFilled className='w-5 h-5 text-gray-800' />
                  <span className="ml-2 text-sm sm:text-base font-semibold text-gray-800">Profile</span>
                </div>

                <div className="mt-4 sm:mt-6 space-y-4">
                  <MobileProfileMenu
                    onLogout={() => {
                      setIsMobileProfileMenuOpen(false);
                      setIsOpen(false);
                      }
                    }
                    closeMenu={() => {
                      setIsMobileProfileMenuOpen(false);
                      closeMobileMenu;
                      }
                    }
                  />
                </div>
              </div>
            )}
          </div>
        )
      }
    </>
  )
}
