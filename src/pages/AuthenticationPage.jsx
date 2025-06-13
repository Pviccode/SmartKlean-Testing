import AuthForm from "../components/AuthForm";
import Footer from "../components/Footer";
import axios from 'axios';
import { redirect, replace } from "react-router-dom";
import { z } from 'zod';
import { EMAIL_REGEX, NAME_REGEX, PASSWORD_REGEX } from "../util/inputValidation";
// import { fetchCsrfToken } from "../util/auth";

// Input validation schemas using zod
const LoginSchema = z.object({
  email: z.string()
    .trim()
    .nonempty('Email is required')
    .regex(EMAIL_REGEX, 'Invalid email address'),
  password: z.string()
    .trim()
    .nonempty('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .max(128, 'Password cannot exceed 128 characters'),
});

const NameSchema = z.string()
    .trim()
    .nonempty('Name is required')
    .min(2, 'Name must be at least 2 characters long.')
    .max(50, 'Name cannot exceed 50 characters')
    .regex(NAME_REGEX, 'Name must contain only letters, spaces, hyphens, or apostrophes');

const SignupSchema = LoginSchema.extend({
  firstName: NameSchema,
  lastName: NameSchema
}).refine(
  (data) => PASSWORD_REGEX.test(data.password),
  {
    message: 'Password must include uppercase, lowercase, number, and a special character',
    path: ['password'],
  }
);

export default function AuthenticationPage() {
  return (
    <>
      <AuthForm />
      <Footer />
    </>
  )
}

export async function authAction({request}) {
  const data = await request.formData();
  const url = new URL(request.url);
  const authMode = url.searchParams.get('mode') || 'login';
  // const csrfToken = data.get('csrfToken');

  if (authMode !== 'login' && authMode !== 'signup') {
    throw new Response(JSON.stringify({ message: 'Unsupported authentication mode.'}), { status: 422 });
  }

  try {
    // Extract form inputs
    const formData = {
      firstName: data.get('firstName')?.toString(),
      lastName: data.get('lastName')?.toString(),
      email: data.get('email')?.toString(),
      password: data.get('password')?.toString(),
    };

    // Validate inputs using zod
    const schema = authMode === 'signup' ? SignupSchema : LoginSchema;
    const validationResult = schema.safeParse(formData);

    if (!validationResult.success) {
      return {
        message: 'Authentication failed due to validation errors',
        errors: validationResult.error.flatten().fieldErrors
      };
    }

    // if (!csrfToken) {
    //   throw new Response(JSON.stringify({ message: 'CSRF token missing' }), { status: 400 });
    // }

    // Determine API endpoint based on mode
    const endpoint = authMode === 'login' ? '/auth/login' : '/auth/signup';
    const payload = authMode === 'login' ? 
      { email: formData.email, password: formData.password } 
      : 
      { firstName: formData.firstName, lastName: formData.lastName, email: formData.email, password: formData.password } 

    const makeRequest = async () => {
      return await axios.post(`${import.meta.env.VITE_BACKEND_URL}${endpoint}`, 
        payload,
        { 
          headers: {
            'Content-Type': 'application/json',
            // 'x-csrf-token': token,
          },
          withCredentials: true
        },
      );
    };

    const response = await makeRequest();

    // Successful authentication. Manage the token gotten from the backend, (No need to store token manually because it is already stored in a cookie in our case).
    if (authMode === 'login') {
      return redirect('/');
    } else {
      return redirect('?mode=login');
    }

  } catch (error) {
    // if (error.response.status === 403 && error.response.data.message === 'Invalid CSRF token') {
    //   try {
    //     // Token expired, fetch a new one and retry
    //     // const { csrfToken } = await fetchCsrfToken();
    //     // const response = await makeRequest(csrfToken);
    //     // Successful retry
    //     if (authMode === 'login') {
    //       return redirect('/');
    //     } else {
    //       return redirect('?mode=login');
    //     }
    //   } catch (retryError) {
    //     const retryErrorMessage = retryError.response?.data?.message || 'Failed to authenticate after retrying with new CSRF token.';
    //     throw new Response(JSON.stringify({ message: retryErrorMessage }), { status: 500 });
    //   }

    // };

    if (error.response.status === 422 || error.response.status === 400 || error.response.status === 401) {
      return {
        message: error.response.data.message,
        errors: error.response.data.errors
      };
    }

    // Handle other errors
    const errorMessage = error.response.data.message || 'An unexpected error occurred. Please try again later.';
    throw new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
  }
}

export async function authLoader() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/user`, 
        { withCredentials: true }
      );

      if (!response.data.isAuthenticated) {
        return null;                                            // Allow rendering of login or signup page for non-authenticated users.
      }

      return redirect('/');      // User is authenticated, redirect to homepage or dashboard

    } catch (error) {
      const errorMessage = error.response.data.message || 'An unexpected error occurred. Please try again later.';
      throw new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
}