import { Form, useSearchParams, useActionData, useNavigation, Link, useRouteLoaderData } from "react-router-dom";
import Input from "./Input";
import { normalizeErrors } from "../util/inputValidation";
import { useEffect, useRef } from "react";

export default function AuthForm() {
  const actionData = useActionData();
  // const { csrfToken } = useRouteLoaderData('root');
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const validationErrors = actionData?.errors ? normalizeErrors(actionData.errors) : {};
  const formRef = useRef(null);
  
  // Reset form when isLogin(mode) changes
  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset();  // Reset input values
    }
  }, [isLogin]);

  return (
    <article 
      className='min-h-screen bg-gray-50 flex items-center justify-center py-12 
      sm:py-16 px-4 sm:px-6 lg:px-8'
    >
      <div className='w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-100'>
        <Form 
          method="post" 
          noValidate ref={formRef}
        >
          {/* <input type="hidden" name="csrfToken" value={csrfToken} /> */}
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center'>
            { isLogin ? 'Login' : 'Sign Up' }
          </h1>

          {/* Error message */}
          {
            actionData && actionData.message && (
              <div
                className='mb-6 p-3 bg-red-100 text-red-700 rounded-lg text-sm'
                role="alert"
                aria-live="polite"
                >
                  <p>{actionData.message}</p>
              </div>
            )
          }

          <div className='space-y-4 sm:space-y-5'>
            { !isLogin && (
                <>
                  <div>
                    <Input 
                      label='First Name'
                      id='firstName'
                      type='text'
                      placeholder='Enter your First Name'
                      name='firstName'
                      error={validationErrors.firstName}
                      required
                    />
                  </div>
                  <div>
                    <Input 
                      label='Last Name'
                      id='lastName'
                      type='text'
                      placeholder='Enter your Last Name'
                      name='lastName'
                      error={validationErrors.lastName}
                      required
                    />
                  </div>
                </>
              )
            }
            <div>
              <Input 
                label='Email'
                id='email'
                type='email'
                placeholder='Enter your email'
                name='email'
                error={validationErrors.email}
                required
              />
            </div>
            <div>
              <Input 
                label='Password'
                id='password'
                type='password'
                placeholder='Enter your password'
                error={validationErrors.password}
                name='password'
                required
              />
            </div>
          </div>
          {isLogin && <Link to='/request-password-reset' className='text-sky-600'>Forgot Password?</Link>}

          <button 
            type='submit'
            className='w-full bg-sky-800 text-white py-3 sm:py-4 rounded-full font-semibold 
            text-sm sm:text-base hover:bg-sky-900 transition disabled:bg-sky-300 
            disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-sky-300 mt-6'
            disabled={isSubmitting}
          >
            { isSubmitting ? 'Submitting...' : isLogin ? 'Login' : 'Signup' }
          </button>

          {/* Toggle text link */}
          <p className='mt-4 text-center text-sm sm:text-base text-gray-600'>
            { isLogin ? "Don't have an account yet? " : 'Already have an account? '}
            <Link
              to={`?mode=${isLogin ? 'signup' : 'login'}`}
              className='text-sky-800 hover:text-sky-900 font-medium'
            >
              { isLogin ? 'Signup' : 'Login' }
            </Link>
          </p>
        </Form>
      </div>
    </article>
  )
}
