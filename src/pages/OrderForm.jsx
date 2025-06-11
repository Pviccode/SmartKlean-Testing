import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IconCalendar } from '@tabler/icons-react';

export default function OrderForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [services, setServices] = useState([]);
  const [pickupDate, setPickupDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);   // null, 'success', 'error'

  const navigate = useNavigate();

  const serviceOptions = [
    { name: 'Wash', price: 10 },
    { name: 'Dry Clean', price: 15 },
    { name: 'Iron', price: 5 },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (services.length === 0) newErrors.services = 'At least one service is required';
    if (!pickupDate) {
      newErrors.pickupDate = 'Pickup date is required';
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const pickup = new Date(pickupDate);
      if (pickup < today) newErrors.pickupDate = 'Pickup date must be today or later';
    }
    if (deliveryDate && pickupDate && new Date(deliveryDate) < new Date(pickupDate)) {
      newErrors.deliveryDate = 'Delivery date must be after pickup date';
    }
    return newErrors;
  };

  const handleServiceChange = (e) => {
    const selected = e.target.value;
    const service = serviceOptions.find((s) => s.name === selected);

    if (!service) return;

    if (e.target.checked) {
      setServices([...services, selected]);
      setTotalPrice(totalPrice + service.price);
    } else {
      setServices(services.filter((s) => s !== selected));
      setTotalPrice(totalPrice - service.price);
    }
    if (errors.services) {
      setErrors((prev) => ({ ...prev, services: null }));
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === 'pickupDate') {
      setPickupDate(value);
    } else {
      setDeliveryDate(value);
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/orders`,
        {
          services,
          pickupDate,
          deliveryDate,
          totalPrice,
        },
        { withCredentials: true }
      );
      setStatus('success');
      setServices([]);
      setPickupDate('');
      setDeliveryDate('');
      setTotalPrice(0);
      setErrors({});
      setTimeout(() => navigate('/dashboard'), 2000); // Navigate after showing success
    } catch (error) {
      setStatus('error');
      setErrors({ submit: 'Order placement failed. Please try again.' });
    }
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <header className="text-center mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">Place Your Order</h2>
        <div className='border-b-2 sm:border-b-4 border-amber-500 w-16 sm:w-20 mx-auto'></div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 sm:p-8 max-w-3xl mx-auto"
        noValidate
      >
        {status === 'success' && (
          <p className="text-green-600 text-sm sm:text-base mb-4 text-center">
            Order placed successfully! Redirecting to dashboard...
          </p>
        )}
        {status === 'error' && errors.submit && (
          <p className="text-red-600 text-sm sm:text-base mb-4 text-center">{errors.submit}</p>
        )}

        <div className="mb-6 sm:mb-8">
          <h3 className="text-base sm:text-lg font-medium text-cyan-400 mb-3 sm:mb-4">
            Select Services
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {serviceOptions.map((service) => (
              <label
                key={service.name}
                className="flex items-center text-sm sm:text-base text-gray-700"
              >
                <input
                  type="checkbox"
                  value={service.name}
                  checked={services.includes(service.name)}
                  onChange={handleServiceChange}
                  className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 border-gray-300 rounded focus:ring-2 focus:ring-cyan-400"
                  aria-describedby={errors.services ? 'services-error' : undefined}
                />
                <span>
                  {service.name} (${service.price})
                </span>
              </label>
            ))}
          </div>
          {errors.services && (
            <p id="services-error" className="text-red-600 text-xs sm:text-sm mt-2">
              {errors.services}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label
              htmlFor="pickupDate"
              className="block text-sm sm:text-base font-medium text-cyan-400 mb-1"
            >
              Pickup Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="pickupDate"
                name="pickupDate"
                value={pickupDate}
                onChange={handleDateChange}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 hover:bg-cyan-50 transition"
                required
                aria-describedby={errors.pickupDate ? 'pickupDate-error' : undefined}
              />
              <IconCalendar
                className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400"
                aria-hidden="true"
              />
            </div>
            {errors.pickupDate && (
              <p id="pickupDate-error" className="text-red-600 text-xs sm:text-sm mt-1">
                {errors.pickupDate}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="deliveryDate"
              className="block text-sm sm:text-base font-medium text-cyan-400 mb-1"
            >
              Delivery Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="deliveryDate"
                name="deliveryDate"
                value={deliveryDate}
                onChange={handleDateChange}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 hover:bg-cyan-50 transition"
                aria-describedby={errors.deliveryDate ? 'deliveryDate-error' : undefined}
              />
              <IconCalendar
                className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400"
                aria-hidden="true"
              />
            </div>
            {errors.deliveryDate && (
              <p id="deliveryDate-error" className="text-red-600 text-xs sm:text-sm mt-1">
                {errors.deliveryDate}
              </p>
            )}
          </div>
        </div>

        <p className="text-sm sm:text-base text-gray-700 mt-4 sm:mt-6 mb-6 sm:mb-8">
          Total Price: <strong>${totalPrice}</strong>
        </p>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 sm:px-8 py-2 sm:py-3 bg-cyan-400 text-white text-sm sm:text-base font-semibold rounded-md hover:bg-cyan-500 focus:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
          >
            Place Order
          </button>
        </div>
      </form>
    </section>
  );
}