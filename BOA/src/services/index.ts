import sensorController from "./Sensor";
import setupController from "./setup";
import loginController from "./login";
import streamController from "./stream";

export const API = {
  sensors: sensorController,
  setup: setupController,
  login: loginController,
  stream: streamController,
};
