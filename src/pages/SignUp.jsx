import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Task_Management from '../utils/Task_Management.png';
import '../app.css';
import '../main.min.css';
import app from '../components/Firebase/firebase';
import { getAuth, createUserWithEmailAndPassword, updateProfile  } from 'firebase/auth';
import { useState } from 'react';

// Define the validation schema using Zod
const schema = z.object({
  username: z
    .string()
    .min(1, { message: 'Username is required' })
    .max(16, { message: 'Username max length is 16' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(20, { message: 'Password must be less than 20 characters' }),
  role: z.string().nonempty({ message: 'Role is required' }),
});

const SignUp = () => {
  const { register, formState: { errors }, reset, getValues} = useForm({ resolver: zodResolver(schema), mode: 'onChange' });
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [Password, setUserPassword] = useState('');
  const [fireError, setFireError] = useState('');

  // Handle input change to dynamically update the form values
  const handleInputChange = () => {
    const formValues = getValues();
    // setInput(formValues); // Update local state with form values
    setName(formValues.username);
    setEmail(formValues.email);
    setUserPassword(formValues.password);
    console.log('Form values on change:', {name, email, Password});
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get the form values at the time of submission
      // const { username, userRole, userEmail, userPassword } = getValues();

      // Create the user with Firebase authentication
      if(errors.username || (''===getValues().username)){
        setFireError('Username is required!');
      }
      else{
        const userCredential = await createUserWithEmailAndPassword(auth, email, Password);
        const user = userCredential.user;
        await updateProfile(user, { displayName: name });
        // Update the user profile with the provided username
  
        console.log("Form submitted with values:", { name, email, Password });
        console.log("Firebase user:", user);
        
        // Navigate to another route after successful signup
        navigate('/login');
      }
      
    } catch (error) {
      if(error.message === 'Firebase: Error (auth/email-already-in-use).'){
        setFireError('Email already in use');
      }else if(error.message === 'Firebase: Error (auth/invalid-email).'){
        setFireError('Invalid Email Address');
      }else{
        setFireError('Password is required!');
      }
      console.log('Error during signup:', error.message);
    }
    reset();
  };

  return (
    <div className="flex flex-wrap h-screen">
      <div className="w-full md:w-1/2 bg-blue-300 flex justify-center items-center rounded-r-full shadow-lg hover:translate-x-0.5 transition-all">
        <img src={Task_Management} alt="task management" className="w-3/4 h-auto object-cover" />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <h1 className=" mb-8 noto-serif-oriya-wht-700 noto-serif-lg-h2">Create New Account</h1>

        <form className="w-full max-w-md" onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              id="username"
              name='username'
              placeholder="Enter your username"
              autoComplete="off"
              {...register('username',{
                onChange:(e)=>{handleInputChange(e)}
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && <small className="text-red-500">{errors.username.message}</small>}
          </div>

          <div className="mb-4">
            <label htmlFor="user-email" className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="user-email"
              name='email'
              placeholder="Enter your email"
              autoComplete="off"
              {...register('email',{
                onChange:(e)=>{handleInputChange(e)}
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <small className="text-red-500">{errors.email.message}</small>}
          </div>

          <div className="mb-4">
            <label htmlFor="user-password" className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="user-password"
              name='password'
              placeholder="Enter your password"
              autoComplete="off"
              {...register('password',{
                onChange:(e)=>{handleInputChange(e)}
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <small className="text-red-500">{errors.password.message}</small>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">Log in here</Link>
        </p>
        {fireError && <small className="text-red-500">{fireError}</small>}
      </div>
    </div>
  );
};

export default SignUp;
