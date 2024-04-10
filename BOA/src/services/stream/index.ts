import { AxiosResponse } from "axios";
import http from "../api";

async function mjpeg() {
  return await http.get<ArrayBuffer>("stream/mjpeg");
}

export default {
  mjpeg,
};
