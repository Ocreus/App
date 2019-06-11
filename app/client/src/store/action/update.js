import { UPDATE, UPDATE_FAIL } from "../types";
import axios from "axios";
export const update = () => async dispatch => {
  try {
    const res = await axios.get("/update");
    dispatch({ type: UPDATE, payload: res.data });
  } catch (error) {
    dispatch({ type: UPDATE_FAIL });
  }
};
