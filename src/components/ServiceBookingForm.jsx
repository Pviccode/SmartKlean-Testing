import { Form, redirect, useActionData, useNavigation, useRouteLoaderData } from "react-router-dom";
import axios from "axios";
import Input from "./Input";
import { z } from 'zod';
import { EMAIL_REGEX, formatDate } from "../util/inputValidation";

// Validation schema using zod
const BookingSchema = z.object({
    email: z
      .string()
      .trim()
    //   .nonempty('Email is required')
      .regex(EMAIL_REGEX, 'Invalid email address'),
    phoneNumber: z
      .string()
      .trim()
    //   .nonempty('Phone number is required')
      .regex(/^\+?\d{10,15}$/, 'Phone number must be 10-15 digits, optionally starting with +'),
    serviceAddress: z.object({
        street: z
          .string()
          .min(5, 'Address must be at least 5 characters')
          .max(100, 'Address must be less than 100 characters'),
        city: z
          .string()
          .min(2, 'City must be at least 2 characters')
          .max(50, 'City must be less than 50 characters'),
        zip: z
          .string()
          .regex(/^\d{5}(-\d{4})?$/, 'Invalid zip code'),
    }),
    services: z
      .array(z.enum([
        'residential_cleaning',
        'construction_cleaning',
        'carpet_cleaning',
        'laundry_cleaning'
      ]))
      .min(1, 'At least one service must be selected'),
    selectedDate: z
      .string()
      .refine(val => {
        const date = new Date(val);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
      }, 'Date must be today or in the future'),
    notes: z
      .string()
      .max(500, 'Notes must be less than 500 characters')
      .optional(),
});

export default function ServiceBookingForm({ method, bookingData }) {
  const actionData = useActionData();
//   const { csrfToken } = useRouteLoaderData('root');
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const formattedDate = formatDate(bookingData?.selectedDate);

  const serviceTypes = [
    { name: 'Residential Cleaning', value: 'residential_cleaning' },
    { name: 'Post-Construction Cleaning', value: 'construction_cleaning' },
    { name: 'Carpet and Upholstery Cleaning', value: 'carpet_cleaning' },
    { name: 'Laundry and Dry Cleaning', value: 'laundry_cleaning' },
  ];

  return (
    <article className='className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
      <header className="text-center mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">Cleaning Service Form</h2>
        <div className='border-b-2 sm:border-b-4 border-amber-500 w-16 sm:w-20 mx-auto'></div>
      </header>

      <Form
        method={method}
        noValidate
      > 
        {/* <input type="hidden" name="csrfToken" value={csrfToken} /> */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
          
          <div>
            <Input 
              label='Email'
              id='email'
              type='email'
              placeholder='Enter your email'
              name='email'
              defaultValue={bookingData?.email}
              required
            />
          </div>

          <div>
            <Input
              label='Phone Number'
              id='phoneNumber'
              type='tel'
              placeholder='Enter Phone Number'
              name='phoneNumber'
              defaultValue={bookingData?.phoneNumber}
              required
            />
          </div>

          <div>
            <Input
              label='Street Address'
              id='street'
              type='text'
              placeholder='Enter Address'
              name='street'
              defaultValue={bookingData?.serviceAddress.street}
              required
            />
          </div>

          <div>
            <Input
              label='City'
              id='city'
              type='text'
              placeholder='Enter City'
              name='city'
              defaultValue={bookingData?.serviceAddress?.city}
              required
            />
          </div>

          <div>
            <Input
              label='Zip Code'
              id='zip'
              type='text'
              placeholder='Enter Zip Code'
              name='zip'
              defaultValue={bookingData?.serviceAddress?.zip}
              required
            />
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Select Service</h3>
            <div>
              {serviceTypes.map( service => {
                  return (
                    <div className='flex items-center mb-2'>
                      <input 
                        type='checkbox'
                        id={service.value}
                        name='services'
                        value={service.value}
                        defaultChecked={bookingData?.services.includes(service.value)}
                        className='mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5'
                      />
                      <label
                        key={service.value}
                        htmlFor={service.value}
                        className='text-sm sm:text-base font-medium'
                      >
                        {service.name}
                      </label>
                    </div>
                  )
                })
              }
            </div>
          </div>

          <div>
            <Input 
              label='Select Preferred Date'
              id='selectedDate'
              type='date'
              name='selectedDate'
              defaultValue={formattedDate}
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="notes" className="block text-sm sm:text-base font-medium mb-1">
              Additional Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Write text here"
              defaultValue={bookingData?.notes}
              rows="4"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md transition"
            />
          </div>
          
        </div>

        <div className="mt-6 sm:mt-8 flex justify-center">
          <button
            type='submit'
            className="px-6 sm:px-8 py-2 sm:py-3 bg-sky-400 text-white text-sm sm:text-base 
            font-semibold rounded-md hover:bg-sky-500 focus:bg-sky-500 focus:outline-none 
            focus:ring-2 focus:ring-sky-400 transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : bookingData ? 'Update Booking' : 'Book Service'}
          </button>
        </div>

      </Form>
    </article>
  )
}

export async function serviceBookingAction({request, params}) {

    try {
        const method = request.method;
        const data = await request.formData();
        // const csrfToken = data.get('csrfToken');

        // Extract form data
        const bookingData = {
            email: data.get('email')?.toString(),
            phoneNumber: data.get('phoneNumber')?.toString(),
            serviceAddress: {
                street: data.get('street')?.toString(),
                city: data.get('city')?.toString(),
                zip: data.get('zip')?.toString(),
            },
            services: data.getAll('services'),
            selectedDate: data.get('selectedDate')?.toString(),
            notes: data.get('notes')?.toString() || undefined,
        }

        // Validate inputs using zod
        const validationResult = BookingSchema.safeParse(bookingData);

        if (!validationResult.success) {
            return {
            message: 'Booking failed due to validation errors',
            errors: validationResult.error.flatten().fieldErrors
            };
        }

        // if (!csrfToken) {
        //     throw new Response(JSON.stringify({ message: 'CSRF token missing' }), { status: 400 });
        // }

        // Submit booking
        const configObject = {
            headers: {
              'Content-Type': 'application/json',
            //   'X-CSRF-Token': 'csrfToken',
            },
            withCredentials: true
        }
        const response = await method === 'POST' ? 
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/bookings`, bookingData, configObject)
            : 
            axios.patch(`${import.meta.env.VITE_BACKEND_URL}/${params.bookingId}`, bookingData, configObject);

        console.log('The response', response)
        return redirect('/');
    } catch (error) {
        if (error.response.status === 422 || error.response.status === 400 || error.response.status === 401) {
          return {
            message: error.response.data.message,
            errors: error.response.data.errors
          };
        }
        // Handle other errors
        const errorMessage = error.message || 'An unexpected error occurred. Please try again later.';
        throw new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
}
