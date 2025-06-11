import { Form, Link, useActionData, useSearchParams } from "react-router-dom";
import axios from "axios";
import Input from "../components/Input";

export default function ResetPasswordPage() {
    const actionData = useActionData();
    const [searchParams] = useSearchParams();

    const token = searchParams.get('token');

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'>
        <h2 className='text-2xl font-bold text-blue-600 mb-4 text-center'>
          Set New Password
        </h2>
        {!token && <p className='text-red-600 text-center mb-4'>Invalid reset link. Please request a new one.</p>}

        <Form method='post' noValidate>
          <input type="hidden" name="token" value={token || ''} />
          <div>
            <Input 
              label='New Password'
              id='password'
              type='password'
              placeholder='Enter your password'
              name='password'
              required
            />
          </div>

          <button type="submit" disabled={!token}>
            Reset Password
          </button>
          <p className='mt-4 text-center text-gray-600'>
            <Link to='/login' className='text-sky-600 hover:underline'>Back to Log In</Link>
          </p>
        </Form>
      </div>
    </div>
  )
}

export async function resetPasswordAction({ request }) {
    const data = await request.formData();
    const token = data.get('token');
    const password = data.get('password');

    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/reset-password`, { token, password });
        return response.data;
    } catch (error) {
        return {
            status: 'error',
            message: error.response.data.message || 'Failed to reset password. Please try again.',
        };
    }
}
