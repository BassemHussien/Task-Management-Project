import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isUser = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (isUser) {
      <Navigate to="/login" />;
    }
  }, [isUser]);
  
  return children;
};

export default ProtectedRoute;
