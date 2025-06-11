import { useSearchParams, useLoaderData, Link, Form } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function VerifyEmailPage() {
  const data = useLoaderData();
  const [searchParams] = useSearchParams();
  const [showResend, setShowResend] = useState(false);
  console.log('verifyEmailPage.jsx', data)

  return (
    <div className='min-h-screen flex items-center justify-center bg-red-500'>
      <h2 className='text-2xl font-bold text-blue-600 mt-4'>Email Verification</h2>
      {/* <p>{data.message}</p>
      {data.message.includes('successfully') && <Link to='/login'>Proceed to Login</Link>}
      
      {data.resend && (
        <div>
          <Form method="post" noValidate>
            <input type='hidden' name='token' value={searchParams.get('token')} />
            <button type="submit">
              Resend Verification email
            </button>
          </Form>
        </div>
      )} */}
    </div>
  )
}

export async function verifyEmailLoader({request}) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  if (!token) {
    throw new Response(JSON.stringify({ message: 'Invalid verification link' }), { status: 500 })
  }

  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/verify-newUser?token=${token}`);  // Relative URL (uses Vite proxy)
    console.log('response', response.data)
    return response.data;
  } catch (error) {
    const errorMessage = error.response.data.message || 'An unexpected error occurred. Please try again later.';
    throw new Response(JSON.stringify({ message: errorMessage}), { status: 500 });
  }
};

export async function resendEmailAction(request) {
  const data = await request.formData();
  const token = data.get('token');

  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/resend-verification`, 
      { token }
    );
    return response.data;
  } catch (error) {
    const errorMessage = error.response.data.message || 'An unexpected error occurred. Please try again later.';
    if (errorMessage.includes('Invalid')) {
      return error.response.data;
    }
    throw new Response(JSON.stringify({ message: errorMessage}), { status: 500 });
  }
};
