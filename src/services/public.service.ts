import axios from "axios";
import { FormValues } from "../pages";

export const register = (userData: FormValues) => {
  const controller = new AbortController();
  return {
    call: axios.post("http://127.0.0.1:8000/register", userData, {
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    }),
    controller,
  };
};

export const login = (userData: FormValues) => {
  const controller = new AbortController();
  return {
    call: axios.post("http://127.0.0.1:8000/login_view", userData, {
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    }),
    controller,
  };
};

export const logout = (token: string) => {
  const controller = new AbortController();
  return {
    call: axios.post(
      "http://127.0.0.1:8000/logout_view",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        signal: controller.signal,
      }
    ),
    controller,
  };
};

export const getSellerProducts = (id: number, token: string) => {
  const controller = new AbortController();
  return {
    call: axios.get(`http://127.0.0.1:8000/seller_dashboard/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      signal: controller.signal,
    }),
    controller,
  };
};

export const createProduct = (formData: FormData, token: string) => {
  const controller = new AbortController();
  return {
    call: axios.post("http://127.0.0.1:8000/create_product", formData, {
      headers: {
        Authorization: `Token ${token}`,
      },
      signal: controller.signal,
    }),
    controller,
  };
};

export const getCategories = (token: string) => {
  const controller = new AbortController();
  return {
    call: axios.get(`http://127.0.0.1:8000/categories`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      signal: controller.signal,
    }),
    controller,
  };
};

export const getAllProducts = () => {
  const controller = new AbortController();
  return {
    call: axios.get(`http://127.0.0.1:8000/all_products`, {
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    }),
    controller,
  };
};

export const deleteProduct = (productId: number, token: string) => {
  const controller = new AbortController();
  return {
    call: axios.delete(`http://127.0.0.1:8000/delete_product/${productId}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      signal: controller.signal,
    }),
    controller,
  };
};

export const updateProduct = (
  updatedFormData: FormData,
  productId: number,
  token: string
) => {
  const controller = new AbortController();
  return {
    call: axios.post(
      `http://127.0.0.1:8000/update_product/${productId}`,
      updatedFormData,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
        signal: controller.signal,
      }
    ),
    controller,
  };
};
