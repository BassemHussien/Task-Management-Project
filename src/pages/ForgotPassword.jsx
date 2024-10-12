/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Task_Management from '../utils/Task_Management.png';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
// import { toast } from 'react-toastify';
import app from '../components/Firebase/firebase';
// Define the validation schema using Zod
const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

const ForgotPassword = () => {
  const {register, formState: { errors }, reset, getValues} = useForm({resolver: zodResolver(schema),mode: 'onChange'});
  const auth = getAuth(app);
  const [error, setError] = useState('');
  const [inputEmail, setInputEmail] = useState('');

  const handleInputChange = (e) => {
    setInputEmail(e.target.value);
    setError('');
    console.log(inputEmail);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const emailValue = getValues('email');
    console.log(emailValue);
    try {
      await sendPasswordResetEmail(auth, emailValue);
      console.log('Password reset email sent successfully');
    } catch (error) {
      setError(error.message);
      console.log(error.message)
    }
    reset(); 
  };

  return (
    <div className="flex flex-wrap h-screen">
      <div className="w-full md:w-1/2 bg-blue-300 flex justify-center items-center rounded-r-full shadow-lg hover:translate-x-0.5 transition-all">
        <img src={Task_Management} alt="task management" className="w-3/4 h-auto object-cover" />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <h1 className="noto-serif-oriya-wht-700 noto-serif-lg-h2 mb-8 noto-serif-oriya">Forgot Password!</h1>

        <form onSubmit={(e)=>{onSubmit(e)}} className="w-full max-w-md">
     
          <div className="mb-4">
            <label htmlFor="user-email" className="block text-sm font-bold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="user-email"
              placeholder="hello@mail.com"
              autoComplete="off"
              {...register('email',{
                onChange:(e)=>{handleInputChange(e)}
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
          >
            SEND REQUEST <span className="ml-2">→</span>
          </button>
        </form>

        <p className="mt-6 text-gray-600">
          Already Registered?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
        {error && <small className="text-red-500 text-md">Enter Authorized Email!</small>}
      </div>
    </div>
  );
};

export default ForgotPassword;
