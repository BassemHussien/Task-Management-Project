import { logout } from '../components/Redux/Auth/authActions';
import { useEffect, useState } from 'react';
import app from '../components/Firebase/firebase';
import { getDatabase, push, ref, set, get } from "firebase/database";
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

  const db = getDatabase(app);
  const docRef = push(ref(db, 'users/info'));
  const saveData = async () => {
    await set(docRef, {
      username: user.displayName,
      email: user.email,
      profile_picture: user.photoURL
    }).then(()=>{
      alert('User saved to FireStore');
    }).catch((error)=>{
      alert('Error saving user to FireStore: ', error.message);
    });
  }
  const fetchData = async ()=>{
    const fetchRef = ref(db, 'users/info');
    try {
      const snapshot = await get(fetchRef);
      if(snapshot.exists()){
        console.log(Object.values(snapshot.val()));
      }else{
        alert('No data found');
      }
    } catch (error) {
      console.error("Error fetching user data from FireStore: ", error);
    }
  }
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
          {/* Add database actions */}
          <div className="firestore-btns flex justify-center gap-10">
            <div className='mt-5'>
              <button
                type="button"
                className="bg-green-500 text-white p-2 px-8 rounded-lg hover:bg-green-600 transition duration-300"
                onClick={saveData}
              >
                Save this user to FireStore
              </button>
            </div>
            <div className='mt-5'>
              <button
                type="button"
                className="bg-green-500 text-white p-2 px-8 rounded-lg hover:bg-green-600 transition duration-300"
                onClick={fetchData}
              >
                Get user info from FireStore
              </button>
            </div>
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
