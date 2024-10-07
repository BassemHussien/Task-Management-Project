import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Task_Management from '../utils/Task_Management.png';

// Define the validation schema using Zod
const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(20, { message: 'Password must be less than 20 characters long' }),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
        <h1 className="noto-serif-oriya-wht-700 noto-serif-lg-h2 mb-8">Welcome Back!</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">

          <div className="mb-4">
            <label htmlFor="user-email" className="block text-sm font-bold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="user-email"
              placeholder="hello@mail.com"
              autoComplete="off"
              {...register('email')}
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
              {...register('password')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <small className="text-red-500">{errors.password.message}</small>}
          </div>
          <Link to="/login/dashboard">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
            LOGIN
          </button>
            </Link>
        </form>

        <p className="mt-6 text-blue-700 hover:underline cursor-pointer">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
