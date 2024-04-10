import { AxiosResponse } from "axios";
import http from "../api";
import { Distance } from "./types";

async function getDistanceSingle(): Promise<AxiosResponse<Distance>> {
  return http.get<Distance>("sensor/get-distance-single");
}

export default {
  getDistanceSingle,
};
