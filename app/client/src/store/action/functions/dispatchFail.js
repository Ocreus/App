import { setAlert } from "../alert";

export default function(dispatch, classType, errors = null) {
  if (errors) errors.forEach(error => dispatch(setAlert(error.msg, classType)));
}
