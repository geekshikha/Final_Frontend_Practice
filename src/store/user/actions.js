import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";
import { appLoading, appDoneLoading, setMessage } from "../appState/slice";
import { showMessageWithTimeout } from "../appState/actions";
import { loginSuccess, logOut, tokenStillValid, spaceUpdate } from "./slice";

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        name,
        email,
        password,
      });

      dispatch(
        loginSuccess({
          token: response.data.token,
          user: response.data.existingUser, //! change by me bcoz now user: response.data.user is changed to response.data.existingUser
        })
      );
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      } else {
        console.log(error.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.message,
          })
        );
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });

      // console.log(" response", response);
      dispatch(
        // loginSuccess({ token: response.data.token, user: response.data.user })
        loginSuccess({
          token: response.data.token,
          user: response.data.existingUser,
        })
      );
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      } else {
        console.log(error.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid({ user: response.data }));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

export const updateMySpaceThunk = (
  title,
  description,
  backgroundColor,
  color
) => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user;
      const { space } = getState().user.profile; //! this is imp (not use user.profile.space)
      dispatch(appLoading());

      console.log("spaceId:", space.id);

      const response = await axios.patch(
        `${apiUrl}/space/${space.id}`,
        {
          title,
          description,
          backgroundColor,
          color,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("update:", response);
      console.log("update:", response.data.spaceToUpdate);
      dispatch(
        showMessageWithTimeout("success", false, "update successfull", 3000)
      );
      dispatch(spaceUpdate(response.data.spaceToUpdate));
    } catch (error) {
      console.log(error.message);
    }
  };
};
