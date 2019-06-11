import axios from "axios";

export default function() {
  if (localStorage.token) {
    axios.defaults.headers["x-auth-token"] = localStorage.token;
  } else {
    delete axios.defaults.headers["s-auth-token"];
  }
}
