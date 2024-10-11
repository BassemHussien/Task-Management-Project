/* eslint-disable react/prop-types */
// import { selectadminState } from "./components/Redux/Admin/adminSlice";
// import { selectUserState } from "./components/Redux/User/userSlice";

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLogined = useSelector((state) => state.admin.isLogined);

  if (!isLogined) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
