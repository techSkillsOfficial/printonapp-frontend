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
        'http://54.159.212.143:4000/login',
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

        const user = { username: formData.email };

        dispatch(loginSuccess(user));

        // Redirect to another page or perform other actions
        navigate('/Userdashboard');
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
