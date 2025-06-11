import { IconSettings, IconBell, IconLogout, IconCreditCard, IconHistory, IconEdit, IconHeadset } from "@tabler/icons-react";
import { NavLink, Form } from "react-router-dom";

// Icons lookup
const iconsPool = {
  settings: IconSettings,
  bell: IconBell,
  payment: IconCreditCard,
  bookings: IconHistory,
  editProfile: IconEdit,
  customerSupport: IconHeadset
};

const menuLinks = [
  { to: "settings", text: "Account settings", icon: "settings" },
  { to: "notifications", text: "Notifications", icon: "bell" },
  { to: "payment", text: "Payment", icon: "payment" },
  { to: "my-bookings", text: "My Bookings", icon: "bookings" },
  { to: "edit-profile", text: "Edit Profile", icon: "editProfile" },
  { to: "customer-service", text: "Help and Support", icon: "customerSupport" },
];

// Renders a dropdown menu for authenticated users in the desktop view, shown on hover.
export function DesktopProfileMenu({onLogout, closeMenu, userInitials, userData}) {
  // onLogout: Callback to close the dropdown on logout.
  // closeMenu: Callback to close the dropdown on link click.

  return (
    <div 
      className='absolute right-0 mt-4 w-64 sm:w-72 max-w-[calc(100vw-1rem)] bg-white rounded-lg shadow-lg py-2 pb-4 z-50 border border-gray-300'
    >
      <div className='border-b border-gray-300 px-3 sm:px-4 pt-2 pb-3 mb-2 flex gap-x-2 sm:gap-x-3'>
        <div>
          <button
            className='flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 
            rounded-full bg-sky-800 text-white text-lg sm:text-xl font-bold 
            cursor-pointer hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500'
            onClick={closeMenu}
            aria-label={`Close profile menu for ${userData.firstName}`}
          >
            {userInitials}
          </button>
        </div>
        <div className='flex flex-col justify-between max-w-[70%]'>
          <p className='leading-5 font-bold text-sm sm:text-base truncate'>{userData.firstName} {userData.lastName}</p>
          <p className='text-xs sm:text-sm truncate'>{userData.email}</p>
        </div>
      </div>
      {menuLinks.map( item => {
          const IconComponent = iconsPool[item.icon];
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className='flex items-center gap-x-2 px-3 sm:px-4 py-2 sm:py-3 text-xs font-medium 
              sm:text-sm text-gray-800 hover:bg-sky-50 hover:text-sky-800 focus:bg-sky-50 focus:text-sky-800 transition'
              onClick={closeMenu}
            >
              <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              {item.text}
            </NavLink>
          )
        })
      }
      <Form action="logout" method="post">
        <button
          type='submit'
          className='flex items-center gap-x-2 px-3 sm:px-4 py-2 sm:py-3 text-xs font-medium
          sm:text-sm text-gray-800 w-full text-left hover:bg-sky-50 hover:text-sky-800 
         focus:bg-sky-50 focus:text-sky-800 transition cursor-pointer'
          onClick={onLogout}
        >
          <IconLogout className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
          Logout
        </button>
      </Form>
    </div>
  )
}


// Renders profile options in the mobile profile menu (appears below the user initials button).
export function MobileProfileMenu({ onLogout, closeMenu }) {
  return (
    <div className="space-y-3 sm:space-y-4 px-2">
      {menuLinks.map( item => {
          const IconComponent = iconsPool[item.icon];
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className='flex items-center gap-x-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium 
              text-gray-800 hover:bg-sky-50 hover:text-sky-800 focus:bg-sky-50 
              focus:text-sky-800 transition'
              onClick={closeMenu}
            >
              <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              {item.text}
            </NavLink>
          )
        })
      }
      <Form action="logout" method="post">
        <button
          type='submit'
          className="flex items-center gap-x-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-800 w-full font-medium 
          text-left hover:bg-sky-50 hover:text-sky-800 focus:bg-sky-50 focus:text-sky-800 transition"
          onClick={onLogout}
          aria-label="Log out"
        >
          <IconLogout className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" aria-hidden="true" />
          Logout
        </button>
      </Form>
    </div>
  );
}