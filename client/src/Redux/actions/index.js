export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";


export const loginUser = (user) => {
    return {
      type: LOGIN_USER,
      payload: user,
    };
  };
  
  export const logoutUser = () => {
    return {
      type: LOGOUT_USER,
    };
  };
  
  export function registerUser(data) {
    return function (dispatch) {
      fetch(`${urlApi}/api/user`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: "REGISTER_USER", payload: data });
        });
    };
  }