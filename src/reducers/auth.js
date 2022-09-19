import {
  LOADING_GET_USER_TYPE,
  GOT_USER_TYPE,
  GOT_USER_TYPE_FAILED,
  LOGIN_SUCCESS,
  LOGIN_LOADING,
  LOGOUT_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  CHANGE_PASSWORD_LOADING,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  ADMIN_REQUEST_ACCESS_LOADING,
  ADMIN_REQUEST_ACCESS_SUCCESS,
  ADMIN_REQUEST_ACCESS_FAIL,
  ADMIN_LOGOUT_LOADING
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading_check_user_type: false,
  user_type: null,
  login_loading: false,
  user: null,
  change_password_loading: false,
  isLoading: false,
  admin_request_access_loading: false,
  admin_access_granted: false,

  // testing_array: ["one Item"]
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOADING_GET_USER_TYPE:
      return {
        ...state,
        loading_check_user_type: true,
        // testing_array: state.testing_array.cancat("Second Item") ]
      };
    case ADMIN_LOGOUT_LOADING:
      return {
        ...state,
        admin_request_access_loading: true
      };
    case ADMIN_REQUEST_ACCESS_LOADING:
      return {
        ...state,
        admin_request_access_loading: true
      };
    case ADMIN_REQUEST_ACCESS_FAIL:
      return {
        ...state,
        admin_request_access_loading: false,
        admin_access_granted: false
      };
    case ADMIN_REQUEST_ACCESS_SUCCESS:
      return {
        ...state,
        admin_request_access_loading: false,
        admin_access_granted: true
      };
    case CHANGE_PASSWORD_LOADING:
      return {
        ...state,
        change_password_loading: true
      };
    case CHANGE_PASSWORD_SUCCESS:
    case CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        change_password_loading: false
      };
    case LOGIN_LOADING:
      return {
        ...state,
        login_loading: true
      };
    case GOT_USER_TYPE:
      return {
        ...state,
        loading_check_user_type: false,
        user_type: action.payload
      };
    case GOT_USER_TYPE_FAILED:
      return {
        ...state,
        loading_check_user_type: false
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        login_loading: false
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    default:
      return state;
  }
}
