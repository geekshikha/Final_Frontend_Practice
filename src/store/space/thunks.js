import axios from "axios";
import { apiUrl } from "../../config/constants";
import { spaceList, spaceDetails } from "./slice";
import { appLoading, appDoneLoading } from "../appState/slice"; //! by me setMessage
// import { showMessageWithTimeout } from "../appState/actions"; //! still to apply

export const fetchSpacesThunk = () => async (dispatch, getState) => {
  dispatch(appLoading());
  try {
    const response = await axios.get(`${apiUrl}/space`);
    // console.log("response", response);
    // console.log("responsemore", response.data);
    const spaces = response.data;
    dispatch(spaceList(spaces));
    dispatch(appDoneLoading());
  } catch (e) {
    console.log(e.message);
    dispatch(appDoneLoading());
  }
};

export const fetchSpaceDetailsThunk = (id) => async (dispatch, getState) => {
  dispatch(appLoading());
  try {
    const response = await axios.get(`${apiUrl}/space/${id}`);
    // console.log("spaceIdResponse", response);
    const details = response.data;
    dispatch(spaceDetails(details));
    dispatch(appDoneLoading());
  } catch (error) {
    console.log(error.message);
    dispatch(appDoneLoading());
  }
};
