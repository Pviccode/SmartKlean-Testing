import axios from 'axios';
import { redirect } from 'react-router-dom';

// Loader to check user authentication status
export async function rootLoader() {
    try {
        // Fetch CSRF token
        const csrfResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/csrf-token`,
            { withCredentials: true }
        );
        const { csrfToken } = csrfResponse.data;

        // Fetch authentication status
        try {
            const authResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/user`,
                { withCredentials: true }
            );

            return {
                auth: authResponse.data,   // { isAuthenticated: true, user: { email, role } }  or  { isAuthenticated: false, user: null }
                csrfToken
            };    
        } catch (authError) {
            throw authError;     // Rethrow other auth errors
        }

    } catch (error) {
        // Handle CSRF or other errors
        const errorMessage = error.response.data.message || 'Server error. Please try again.';         // Something happened in setting up the request that triggered an Error
        throw new Response(JSON.stringify({ message: errorMessage }), { status: 500 }); 
    }
}

// Loader to protect routes by redirecting unauthenticated users
export async function checkAuthLoader() {
    try {
        const responseData = await rootLoader();

        if (!responseData.auth.isAuthenticated) {
            // Pass CSRF token to login page via state
            return redirect('/auth?mode=login', {            // Redirect to login page for non-authenticated users.
                state: { csrfToken: responseData.csrfToken },
            });     
        }

        return null; // No data is returned for authenticated users, rely on that of the rootLoader function instead.
    } catch (error) {
        // Handle errors by redirecting to login page with no CSRF token
        return redirect('/auth?mode=login');
    }
};