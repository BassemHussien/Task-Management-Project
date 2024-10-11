import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react'
import {USER_LOGIN, USER_LOGOUT, userLogin, userLogout} from './userActions'
import { onAuthStateChanged } from 'firebase/auth';

const initialState = {
    name: null,
    email: null
}

const userReducer = ({children}, state = initialState, action) => {
    const [user, setuser] = useState(null);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        switch(action.type){
            case USER_LOGIN:
                return {
                    ...state,
                    name: action.payload.name,
                    email: action.payload.email
                }
            case USER_LOGOUT:
                return setuser(null);
            default:
                return state;
            }
        setLoading(false);
        });
        if (user) {
            dispatch(userLogin(JSON.parse(user)));
        }
        setLoading(false);
    }, [dispatch]);
    return (
    <div>
      
    </div>
  )
}

export default userReducer
