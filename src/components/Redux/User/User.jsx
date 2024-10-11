// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { logout } from '../store/authSlice';
// import { useState, useEffect } from 'react';
import store from '../store';

// let userName = "BlaBlaBla";

const User = () => {
  let user = store.getState().user;
  return (
    <div>
      Hi I am user profile {user.email}
    </div>
  )
}

export default User
