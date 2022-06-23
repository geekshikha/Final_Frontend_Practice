import axios from "axios";
import { apiUrl } from "../../config/constants";
import { spaceList, spaceDetails } from "./slice";

export const fetchSpacesThunk = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${apiUrl}/space`);
    // console.log("response", response);
    // console.log("responsemore", response.data);
    const spaces = response.data;
    dispatch(spaceList(spaces));
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchSpaceDetailsThunk = (id) => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${apiUrl}/space/${id}`);
    // console.log("spaceIdResponse", response);
    const details = response.data;
    dispatch(spaceDetails(details));
  } catch (error) {
    console.log(error.message);
  }
};
