import { redirect } from "react-router-dom";

export async function logoutAction() {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`,       // Sends a POST request to http://localhost:8400/auth/logout with an empty body ({}).
            {}, 
            { withCredentials: true }     
        );

        return redirect('/');
    } catch (error) {
        console.error('Error: ', error);
    }
};