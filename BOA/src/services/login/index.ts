import { credentials } from "./types";
import http from "../api";
import { AxiosResponse } from "axios";

async function login(login: credentials): Promise<AxiosResponse<credentials>> {
  return http.post("auth/login", login);
}

export default {
  login,
};
