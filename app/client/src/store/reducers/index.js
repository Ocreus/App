import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import update from "./update";

export default combineReducers({
  auth,
  alert,
  update,
});
