// import data from '../dataExample.json'

const initialState = {
  user: "",
  login: true,
  users: [],
  usersDetail: [],
  }
  
  export default function reducer (state = initialState, action) {
    switch (action.type) {
      case LOGIN_USER:
        return { ...state, user: action.payload };
      case LOGOUT_USER:
        return { ...state, user: "" };
      default:
        return { ...state }
        case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case POST_USER:
      return {
        ...state,
      };
    }
  }
  