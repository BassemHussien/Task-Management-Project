import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Task_Management from '../utils/Task_Management.png';
import '../app.css';
import '../main.min.css'
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange', 
  });

  const onSubmit = (data) => {
    console.log(data); 
    reset(); 
  };

  return (
    <div className="flex flex-wrap h-screen">
      <div className="w-full md:w-1/2 bg-blue-300 flex justify-center items-center rounded-r-full shadow-lg hover:translate-x-0.5 transition-all">
        <img src={Task_Management} alt="task management" className="w-3/4 h-auto object-cover" />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <h1 className=" mb-8 noto-serif-oriya-wht-700 noto-serif-lg-h2">Create New Account</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
         
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              autoComplete="off"
              {...register('username')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && <small className="text-red-500">{errors.username.message}</small>}
          </div>

         
          <div className="mb-4">
            <label htmlFor="user-email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="user-email"
              placeholder="Enter your email"
              autoComplete="off"
              {...register('email')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <small className="text-red-500">{errors.email.message}</small>}
          </div>
        
          <div className="mb-4">
            <label htmlFor="user-password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="user-password"
              placeholder="Enter your password"
              autoComplete="off"
              {...register('password')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <small className="text-red-500">{errors.password.message}</small>}
          </div>

         
          <div className="mb-4">
            <label htmlFor="role-select" className="block text-gray-700 mb-2">
              Select your Role
            </label>
            <select
              {...register('role')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="role-select"
            >
              <option value="" disabled>
                Select
              </option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            {errors.role && <small className="text-red-500">{errors.role.message}</small>}
          </div>
          <Link to="/login">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            
            >
            Sign Up
          </button>
            </Link>

        </form>

        <p className="mt-6 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
