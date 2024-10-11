/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
import { adminLogin, adminLogout} from './adminActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const dispatch = useDispatch();
const navigate = useNavigate();

const isLogined = useSelector((state) => state.admin.isLogined);
const adminName = useSelector((state) => state.admin.adminName);
const adminEmail = useSelector((state) => state.admin.adminEmail);

const [name, setName] = useState('');
const [password, setPassword] = useState('');
const [email, setEmail] = useState('');
const [isRoleAdmin, setIsRoleAdmin] = useState(false);
useEffect(() => {
  if (!isLogined) {
    navigate('/login');
  }
}, [isLogined, navigate]);
// export const handleLogin = () => {
//   dispatch(adminLogin({ adminName: name, adminPassword: password, adminEmail: email, isRoleAdmin }));
// };
const Admin = () => {
  return (
    <div>
      <div className='mx-auto w-3/4 flex flex-col justify-center align-middle mt-5'>
        <h1><strong>Welcome</strong>, Admin Profile</h1><hr />
        <p><strong>Name</strong>: {adminName}</p><hr />
        <p><strong>Email</strong>: {adminEmail}</p><hr />
      </div>
        <div className='w-full flex justify-center align-middle mt-5'>
          <Link to="/login">
            <button
              onClick={() => dispatch(adminLogout())}
              type="button"
              className=" bg-blue-500 text-white p-2 px-8 rounded-lg hover:bg-blue-600 transition duration-300">
              Logout
            </button>
          </Link>
        </div>
    </div>
  )
}

export default Admin
