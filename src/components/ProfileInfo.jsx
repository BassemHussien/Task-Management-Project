import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { signOut, getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../components/Firebase/firebase'

import person from '../assets/person-circle-outline.svg'
import '../index.css'

const ProfileInfo = () => {
  const [open, setOpen] = React.useState(false);
 
  const openDialog = () => setOpen(!open);
 
  const authFirebase = getAuth(app);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
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
    navigate('/login');
  };

  return (
    <>
    <div className="mb-3 flex ">
    <button type='button' onClick={() => openDialog()}><img src={person} className='person-img'/></button>
    </div>
    <div className="dialog-div">
    <dialog className={`${open?'show-dialog':'hide-dialog'}`}>
        <p className="header-name">Profile</p>
        <button type="button" className="close-dialog-plus" onClick={() => openDialog()}><span style={{fontSize:"20px"}}>+</span></button>
        <div>
            <p><strong style={{userSelect:"none"}}>User Name: </strong>{user.displayName}</p>
            <p><strong style={{userSelect:"none"}}>User Email: </strong>{user.email}</p>
            
          <div className='mt-5 text-center'>
            <button
              type="button"
              className="bg-red-500 text-white p-2 px-8 rounded-lg hover:bg-red-600 transition duration-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
    </dialog>
    </div>
    </>
  );
}

export default ProfileInfo;