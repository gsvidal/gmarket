import { useState, useEffect, useRef } from "react";
import { AxiosResponse } from "axios";
import { AxiosCall } from "../models";

export const useFetchAndLoad = () => {
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  const callEndPoint = async (axiosCall: AxiosCall<any>) => {
    if (axiosCall.controller) {
      controllerRef.current = axiosCall.controller;
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
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    setLoading(false);
  };

  useEffect(() => {
    return () => {
      cancelEndpoint();
    };
  }, []);

  return {
    loading,
    callEndPoint,
  };
};
