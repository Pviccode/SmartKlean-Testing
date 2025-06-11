// Layout and pages
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/layouts/RootLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import AuthenticationPage from './pages/AuthenticationPage.jsx';
import VerifyEmailPage from './pages/VerifyEmailPage.jsx';
import RequestPasswordResetPage, { requestPasswordResetAction } from './pages/RequestPasswordResetPage.jsx';
import ResetPasswordPage, { resetPasswordAction } from './pages/ResetPasswordPage.jsx';
import ServiceBookingPage from './pages/ServiceBookingPage.jsx';
import MyBookingsRootLayout from './pages/layouts/MyBookingsRootLayout.jsx';
import EditServiceBookingPage from './pages/EditServiceBookingPage.jsx';
import MyBookingsPage from './pages/MyBookingsPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';

// Loaders and actions
import { rootLoader, checkAuthLoader } from './util/auth.js';
import { authLoader, authAction } from './pages/AuthenticationPage.jsx';
import { verifyEmailLoader, resendEmailAction } from './pages/VerifyEmailPage.jsx';
import { serviceBookingAction } from './components/ServiceBookingForm.jsx';
import { myBookingsLoader } from './pages/MyBookingsPage.jsx';
import { bookingDetailLoader } from './pages/EditServiceBookingPage.jsx';
import { logoutAction } from './pages/Logout.js';

import AdminDashboard, { loader as ordersLoader} from './pages/admin/AdminDashbord.jsx';
import AdminLayout from './pages/admin/layouts/AdminLayout.jsx';



const router = createBrowserRouter([
  { 
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: rootLoader,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'services', element: <ServicesPage /> },
      { 
        path: 'auth', 
        element: <AuthenticationPage />, 
        action: authAction, 
        loader: authLoader 
      },
      { 
        path: 'verify', 
        element: <VerifyEmailPage />, 
        loader: verifyEmailLoader, 
        action: resendEmailAction 
      },
      { 
        path: 'request-password-reset', 
        element: <RequestPasswordResetPage />, 
        action: requestPasswordResetAction 
      },
      { 
        path: 'reset-password', 
        element: <ResetPasswordPage />, 
        action: resetPasswordAction 
      },
      { 
        path: 'service-booking', 
        element: <ServiceBookingPage />, 
        action: serviceBookingAction, 
        loader: checkAuthLoader 
      },
      { 
        path: 'my-bookings', 
        element: <MyBookingsRootLayout />,
        children: [
          { 
            index: true, element: <MyBookingsPage />, loader: myBookingsLoader 
          },
          { 
            path: 'edit-booking/:bookingId', 
            element: <EditServiceBookingPage />, 
            action: serviceBookingAction, 
            loader: bookingDetailLoader 
          },
        ],
      },
      { path: 'logout', action: logoutAction },

      {
        path: 'admin',
        element: <AdminLayout />,
        loader: checkAuthLoader,
        children: [
          { index: true, element: <AdminDashboard />, loader: ordersLoader },
        ],
      }
    ]
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
