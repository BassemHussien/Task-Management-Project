import { logout } from '../components/Redux/Auth/authActions';
import { useEffect, useState } from 'react';
import app from '../components/Firebase/firebase';
import { signOut, getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Dashboard = () => {
  const authFirebase = getAuth(app);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authFirebase, (currentUser) => {
      if (currentUser) {
        // Set the user in local state
        setUser(currentUser);
      } else {
        setUser(null);  // No user logged in
      }
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, [authFirebase]);

  const handleLogout = async () => {
    await signOut(authFirebase);
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className='w-full flex flex-col justify-center align-middle mt-5'>
      {user ? (
        <div className='mx-auto'>
          <h1><strong>Welcome</strong>, {user.displayName}</h1>
          <p>User Email: {user.email}</p>
          <div className='mt-5'>
            <button
              type="button"
              className="bg-blue-500 text-white p-2 px-8 rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
          <div className='w-full text-center mt-5'>
              <h1>Loading...!</h1>
              <h1>Waiting for seconds to load 👀⏳🥱!!</h1>
          </div>
      )}
    </div>
  );
};

export default Dashboard;
