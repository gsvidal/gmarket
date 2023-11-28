import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import { AxiosCall } from "../models";

export const useFetchAndLoad = () => {
  console.log("useFetchAndLoad");
  const [loading, setLoading] = useState(false);
  let controller: AbortController;

  const callEndPoint = async (axiosCall: AxiosCall<any>) => {
    if (axiosCall.controller) {
      controller = axiosCall.controller;
    }
    setLoading(true);
    let response = {} as AxiosResponse<any>;
    try {
      response = await axiosCall.call;
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

  const cancelEndpoint = () => {
    setLoading(false);
    if (controller) {
      controller.abort();
    }
  };

  useEffect(() => {
    return () => {
      console.log("useFetchAndLoad cleanup");
      cancelEndpoint();
    };
  }, []);

  return {
    loading,
    callEndPoint,
  };
};
