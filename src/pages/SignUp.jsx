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
import { useSelector, useDispatch} from 'react-redux';
import {authCurrent} from '../components/Redux/Auth/authActions';

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
  const { register, formState: { errors }, getValues} = useForm({ 
    resolver: zodResolver(schema), 
    mode: 'onChange' 
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const auth = getAuth(app);
  const userAuth = useSelector((state) => state.auth);
  const [input, setInput] = useState(userAuth);
  const dispatch = useDispatch();

  // Handle input change to dynamically update the form values
  const handleInputChange = () => {
    const formValues = getValues();
    setInput(formValues); // Update local state with form values
    dispatch(authCurrent(input));
    console.log('Form values on change:', input);
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get the form values at the time of submission
      const { username, role, email, password } = getValues();

      // Create the user with Firebase authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update the user profile with the provided username
      await updateProfile(user, { displayName: username });
      
      // Dispatch action to update Redux state with user data
      dispatch(authCurrent({ name: username, email: email, role: role }));
      console.log('Store is:', userAuth);
      
      console.log("Form submitted with values:", { username, role, email, password });
      console.log("Firebase user:", user);
      
      // Navigate to another route after successful signup
      navigate('/login');
    } catch (error) {
      setError(error.message);
      console.log('Error during signup:', error.message);
    }
  };

  return (
    <div className="flex flex-wrap h-screen">
      <div className="w-full md:w-1/2 bg-blue-300 flex justify-center items-center rounded-r-full shadow-lg hover:translate-x-0.5 transition-all">
        <img src={Task_Management} alt="task management" className="w-3/4 h-auto object-cover" />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <h1 className=" mb-8 noto-serif-oriya-wht-700 noto-serif-lg-h2">Create New Account</h1>

        <form className="w-full max-w-md" onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              id="username"
              name='name'
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

          <div className="mb-4">
            <label htmlFor="role-select" className="block text-gray-700 mb-2">Select your Role</label>
            <select
              {...register('role',{
                onChange:(e)=>{handleInputChange(e)}
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="role-select"
              name='role'
            >
              <option value="" disabled>Select</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            {errors.role && <small className="text-red-500">{errors.role.message}</small>}
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
      </div>
    </div>
  );
};

export default SignUp;
