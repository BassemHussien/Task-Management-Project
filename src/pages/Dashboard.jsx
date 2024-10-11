// import Tasks from './Tasks' 
import store from '../components/Redux/store'
import {authCurrent, logout} from '../components/Redux/Auth/authActions'
import { useEffect, useState } from 'react'
import app from '../components/Firebase/firebase'
import {signOut, getAuth, onAuthStateChanged} from 'firebase/auth'
import { useNavigate, Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Dashboard = () => {
  const authFirbase = getAuth(app);
  const [user, setUser] = useState(null);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [name, setName] = useState(''); 
  // const [role, setRole] = useState('');
  const userSel = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    console.log(userSel);
    const unsubscribe = onAuthStateChanged(authFirbase, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);  // Set the user in the state
        dispatch(authCurrent(currentUser.user))
      } else {
        setUser(null);  // No user is logged in
      }
      // console.log(currentUser.displayName);
    });
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [authFirbase, dispatch, userSel]);

  const handleChange = () => {
    dispatch(authCurrent())
  }
  const handleLogout = async () => {
    await signOut(authFirbase);
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className='w-full flex flex-col justify-center align-middle mt-5'>
      {/* <Tasks/> */}
      {user ? (
        <div className='mx-auto'>
          <h1 onChange={handleChange}><strong>Welcome</strong>, {user.displayName}</h1>
          <p onChange={handleChange}>User Email: {user.email}</p>
          <p onChange={handleChange}>User Role: {userSel.role}</p>
          {/* <p onChange={handleChange}>User ID: {userSel.uid}</p> */}
          <div className='mt-5'>
            <button
              type="button"
              className=" bg-blue-500 text-white p-2 px-8 rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={handleLogout}
              >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <>
          <p>No user is logged in.</p>
          <div className='mt-5'>
            <Link to='/login'>
              <button
                type="button"
                className=" bg-blue-500 text-white p-2 px-8 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                Go To Login
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard
