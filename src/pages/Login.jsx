/* eslint-disable no-unused-vars */
// import { getAuth } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { set, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Task_Management from '../utils/Task_Management.png';
import { useState } from 'react';
// import auth from '../components/Firebase/firebase'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import app from '../components/Firebase/firebase';
import { useSelector, useDispatch } from 'react-redux';
import {authCurrent, AUTHORIZED} from '../components/Redux/Auth/authActions';

// Define the validation schema using Zod
const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(20, { message: 'Password must be less than 20 characters long' }),
});
const initialState = {
  email: '',
  isloading:''
}

const Login = () => {
  const {register, handleSubmit,formState: { errors }, reset} = useForm({resolver: zodResolver(schema), mode: 'onChange'});
  const [input, setInput] = useState(initialState);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const auth = getAuth(app);
  const userAuth = useSelector((state) => state.auth); /*********/
  const [isloading, setLoading] = useState(userAuth.loading);  /*********/
  const dispatch = useDispatch(); /*********/
  
  const handleInputChange = (e) => {
    setInput({...input, [e.target.name]: e.target.value});
    // setEmail(input.email);
    setError('');
    setLoading(false);  /*********/
    console.log(input);
    // console.log(userAuth);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(isloading);
    console.log(input);
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, input.email, input.password);
      auth.currentUser = userCredentials.user;
      setLoading(false);  /*********/
      // try {
      //   localStorage.setItem('user', JSON.stringify({ isLogined: true }));
      // } catch (e) {
      //   console.error('Storage error:', e);
      // }
      // dispatch(authCurrent({role: role, loading: isloading, email: email}));  /*********/
      // dispatch(authCurrent({name: userCredentials.user.displayName, loading: false, email: userCredentials.user.email,}))
      navigate('/dashboard/current-user');
      console.log("User ID: ",userCredentials.user.uid, "\n", "User Email: ", userCredentials.user.email); /*********/
    } catch (error) {
      setError(error.message);
      // error? console.log(error.message): null
    }
    
    reset();
  };

  return (
    <div className="flex flex-wrap h-screen">
      <div className="w-full md:w-1/2 bg-blue-300 flex justify-center items-center rounded-r-full shadow-lg hover:translate-x-0.5 transition-all">
        <img src={Task_Management} alt="task management" className="w-3/4 h-auto object-cover" />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <h1 className="noto-serif-oriya-wht-700 noto-serif-lg-h2 mb-8">Welcome Back!</h1>

        <form className="w-full max-w-md">

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
              // onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <small className="text-red-500">{errors.email.message}</small>}
          </div>


          <div className="mb-4">
            <label htmlFor="user-password" className="block text-sm font-bold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="user-password"
              placeholder="******"
              autoComplete="off"
              {...register('password',{
                onChange:(e)=>{handleInputChange(e)}
              })}
              // onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <small className="text-red-500">{errors.password.message}</small>}
          </div>
          <button
            onClick={(e) => onSubmit(e)}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
            LOGIN
          </button>
        </form>

        <p className="mt-6 text-blue-700 hover:underline cursor-pointer">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
        {error && 
        <>
          <p className="text-red-500">You are not registered or password is wrong!</p>
          <div className='w-full flex justify-center align-middle mt-5'>
          <Link to="/signup">
                    <button
                      type="button"
                      className=" bg-orange-500 text-white p-2 px-8 rounded-lg hover:bg-orange-700 transition duration-300"
                      
                      >
                      Create Account 
                    </button>
                  </Link>
          </div>
        </>
        }
      </div>
    </div>
  );
};

export default Login;
