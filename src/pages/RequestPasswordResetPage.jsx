import { Form, useActionData } from "react-router-dom";
import Input from "../components/Input";
import axios from "axios";

export default function RequestPasswordResetPage() {
  const actionData = useActionData();
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'>
        <h2 className='text-2xl font-bold text-blue-600 mb-4 text-center'>Reset Password</h2>
        <Form method="post" noValidate>
          <div>
            <Input 
              label='Email'
              id='email'
              type='email'
              placeholder='Enter your email'
              name='email'
              required
            />
          </div>
          <button type="submit">
            Send
          </button>
        </Form>
      </div>
    </div>
  )
}

export async function requestPasswordResetAction({request}) {
    const data = await request.formData();
    const email = data.get('email');

    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/request-password-reset`,
            { email }
        );
        return response.data;
    } catch (error) {
        return {
            status: 'error',
            message: error.response.data.message || 'Failed to send reset link. Please try again.',
        };
    }
}
