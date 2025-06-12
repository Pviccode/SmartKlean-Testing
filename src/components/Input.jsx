import { useRef, useEffect, useState } from 'react';

export default function Input({ label, id, error, ...props}) {
  return (
    <>
      <label 
        htmlFor={id} 
        className='block text-sm sm:text-base font-medium text-gray-700 mb-1'
      >
        {label}
      </label>
      <input 
        id={id}
        {...props}
        className='w-full px-3 py-2 border rounded-lg 
        focus:outline-none focus:ring-2 focus:ring-sky-300 border-gray-300'
      />
      {(error) && (
        <p className='text-red-700 text-sm mt-1'>
          { error }
        </p>
      )}
    </>
  )
}
