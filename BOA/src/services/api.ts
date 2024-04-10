import axios from "axios";

const instance = axios.create({
  baseURL: "http://pi.local:8200/",
  headers: {
    "x-api-key": localStorage.getItem("APIKey"),
  },
});
export default instance;
