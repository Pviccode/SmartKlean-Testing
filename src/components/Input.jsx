import { useRef, useEffect, useState } from 'react';

export default function Input({ label, id, error, ...props}) {
  const inputRef = useRef(null);
  const [showError, setShowError] = useState(false);

  // Handle real-time validation
    useEffect(() => {
    const input = inputRef.current;

    const handleChange = () => {
      setShowError(!input.validity.valid && input.value !== '');
    };

    const handleBlur = () => {
      setShowError(!input.validity.valid);
    };

    input.addEventListener('input', handleChange);
    input.addEventListener('blur', handleBlur);

    return () => {
      input.removeEventListener('input', handleChange);
      input.removeEventListener('blur', handleBlur);
    };
  }, []);

  return (
    <>
      <label 
        htmlFor={id} 
        className='block text-sm sm:text-base font-medium text-gray-700 mb-1'
      >
        {label}
      </label>
      <input 
        ref={inputRef}
        id={id}
        {...props}
        className={`w-full px-3 py-2 border rounded-lg 
        focus:outline-none focus:ring-2 focus:ring-sky-300
        ${showError || error ? 'border-red-500' : 'border-gray-300'}
        `}
      />
      {(showError || error) && (
        <p className='text-red-700 text-sm mt-1'>
          { error || (showError && inputRef.current?.validationMessage || 'This field is required')}
        </p>
      )}
    </>
  )
}
