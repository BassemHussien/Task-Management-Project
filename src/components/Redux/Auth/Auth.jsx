import { AUTHORIZED, NOT_AUTHORIZED, LOGOUT} from './authActions'
const initialState = {
  name: '',
  email: '',
  role: null,
  loading: false,
}
const authReducer = (state = initialState, action) => {
  switch(action.type){
    case AUTHORIZED:
      return {
          ...state,
          name: action.payload.name,
          email: action.payload.email,
          role: action.payload.role,
          loading: false
      }
    case NOT_AUTHORIZED:
      return {
          ...state,
          loading: true
      }
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default authReducer;
