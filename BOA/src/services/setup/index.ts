import { AxiosResponse } from "axios";
import http from "../api";
import { Correction, Sensor } from "./types";

async function getSensors(): Promise<AxiosResponse<Sensor>> {
  return await http.get<Sensor>("sensor/get-sensors");
}

async function setSensors(sensor: Sensor): Promise<AxiosResponse<Sensor>> {
  return await http.post<Sensor>("sensor/set-sensors", sensor);
}

async function setCorrection(
  correction: Correction
): Promise<AxiosResponse<Correction>> {
  return await http.post<Correction>("setup/set-correction", correction);
}

async function testParameters(): Promise<AxiosResponse<Boolean>> {
  return await http.get<boolean>("setup/test-connection");
}

export default {
  getSensors,
  setSensors,
  setCorrection,
  testParameters,
};
