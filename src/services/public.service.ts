import axios from "axios";
import { FormValues } from "../pages";

export const register = (userData: FormValues) => {
  const controller = new AbortController();
  return {
    call: axios.post(
      "http://127.0.0.1:8000/register",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal
      },
    ),
    controller
  };
};
