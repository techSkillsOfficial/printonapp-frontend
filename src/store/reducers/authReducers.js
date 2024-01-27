// authReducer.js
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE ,SIGNUP_FAILURE,SIGNUP_SUCCESS,SIGNUP_REQUEST} from './../action/auth';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  signupStatus:null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'LOGIN_REQUEST':
      return { ...state, loading: true, error: null };
    case 'SIGNUP_REQUEST':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload, isAuthenticated: true, loading: false, error: null };
    case 'SIGNUP_SUCCESS':
      return { ...state, user: action.payload, signupStatus: true, loading: false, error: null };
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'SIGNUP_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false, loading: false, error: null };
    default:
      return state;
  }
};

export default authReducer;
