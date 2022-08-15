import axios from "axios";

// const root = JSON.parse(localStorage.getItem("persist:root") || "");
// const user = JSON.parse(root.authReducer);

const BaseURL = axios.create({
  baseURL: "http://localhost:5002/",
  timeout: 90000,
  // headers: {
  //   "Authorization": `Bearer ${user.accessToken}`
  // }
});
export default BaseURL