// auth.js
import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});


export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

// Action creators
export const signupRequest = () => ({ type: SIGNUP_REQUEST });
export const signupSuccess = (user) => ({ type: SIGNUP_SUCCESS, payload: user });
export const signupFailure = (error) => ({ type: SIGNUP_FAILURE, payload: error });



export const logout = () => {
    return {
      type: 'LOGOUT',
    };
  };
  

export const login = (formData, navigate) => {
    console.log("QQQQQQQQQQQQqqq")
  return async (dispatch) => {
    dispatch(loginRequest());
    console.log("formData",formData)

    try {
      const response = await axios.post(
        'https://octopus-app-aefqc.ondigitalocean.app/login',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const accessToken = response.data.data.access_token;

      if (accessToken) {
        localStorage.setItem('access_token', accessToken);

        const user = { username: response.data.data};

        dispatch(loginSuccess(user));

        // Redirect to another page or perform other actions
        console.log("role",response.data.data.role)
        if(response.data.data.role=='ADMIN'){
        navigate('/Admindashboard');

        }
        else{

          navigate('/Userdashboard');
        }
      } else {
        console.error('Access token not found in API response.');
      }
    } catch (error) {
      dispatch(loginFailure(error));

      // Handle errors
      console.error('API Error:', error);
    }
  };
};


export const signup = (formData, navigate) => {
    return async (dispatch) => {
      dispatch(signupRequest());
      console.log("222",formData)
  
      try {
        const response = await axios.post(
          'https://octopus-app-aefqc.ondigitalocean.app/signup',
          formData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
          
        
        //const accessToken = response.data.data.access_token;
          console.log("response.data",response.data)
        if (response.data.status==201) {
          //localStorage.setItem('access_token', accessToken);
          console.log("response.data.status",response.data.status)
          const user = { username: formData.firstName};
  
          dispatch(signupSuccess(user));
  
          // Redirect to another page or perform other actions
          // navigate('/signin');
        } else {
          console.error('Access token not found in API response.');
        }
      } catch (error) {
        dispatch(signupFailure(error));
  
        // Handle errors
        console.error('API Error:', error);
      }
    };
  };
