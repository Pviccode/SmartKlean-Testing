import { useRouteError } from "react-router-dom";
import Navbar from "../components/NavigationBar/Navbar";

export default function ErrorPage() {
  const error = useRouteError();

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }

  if (error.status === 404) {
    title = 'Page Not Found!'
    message = 'Could not find resource or page.'
  }

  return (
    <>
      <Navbar />
      <div className='text-center pt-20'>
        <h1 className='font-bold text-2xl'>{title}</h1>
        <p>{message}</p>
      </div>
    </>
  )
};
