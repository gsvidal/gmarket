import { useState } from "react";
import { AxiosPromise, AxiosResponse } from "axios";

export const useFetchAndLoad = () => {
  const [loading, setLoading] = useState(false);

  const callEndPoint = async (axiosCall: AxiosPromise) => {
    setLoading(true);
    let response = {} as AxiosResponse<any>;
    try {
      response = await axiosCall;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.error);
      } else {
        throw new Error(error.message + ". Try again later, please.");
      }
    } finally {
      setLoading(false);
    }
    return response;
  };

  return {
    loading,
    callEndPoint,
  };
};
