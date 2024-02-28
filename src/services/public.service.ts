import axios from "axios";
import { FormValues } from "../pages";
import { Product } from "../models";

const API_URL = import.meta.env.VITE_API_URL as string;

export const register = (userData: FormValues) => {
  const controller = new AbortController();
  return {
    call: axios.post(`${API_URL}/register`, userData, {
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
    call: axios.post(`${API_URL}/login_view`, userData, {
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
      `${API_URL}/logout_view`,
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

export const getSellerProducts = (
  id: number,
  token: string,
  page = 1,
  perPage = 10
) => {
  const controller = new AbortController();
  return {
    call: axios.get(
      `${API_URL}/seller_dashboard/${id}?page=${page}&per_page=${perPage}`,
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

export const createProduct = (formData: FormData, token: string) => {
  const controller = new AbortController();
  return {
    call: axios.post(`${API_URL}/create_product`, formData, {
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
    call: axios.get(`${API_URL}/categories`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      signal: controller.signal,
    }),
    controller,
  };
};

export const getAllProducts = (page = 1, perPage = 10) => {
  const controller = new AbortController();
  return {
    call: axios.get(
      `${API_URL}/all_products?page=${page}&per_page=${perPage}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      }
    ),
    controller,
  };
};

export const deleteProduct = (productId: number, token: string) => {
  const controller = new AbortController();
  return {
    call: axios.delete(`${API_URL}/delete_product/${productId}`, {
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
      `${API_URL}/update_product/${productId}`,
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

export const addProductToCartService = (product: Product, token: string) => {
  const controller = new AbortController();
  console.log("product: ", product)
  return {
    call: axios.post(`${API_URL}/add_to_cart/${product.id}`, product, {
      headers: {
        Authorization: `Token ${token}`,
      },
      signal: controller.signal,
    }),
    controller,
  };
};

export const updateProductQuantity = (
  productId: number,
  factor: number,
  token: string
) => {
  const controller = new AbortController();
  return {
    call: axios.put(
      `${API_URL}/update_quantity/${productId}`,
      { quantity: factor },
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

export const deleteProductFromCart = (productId: number, token: string) => {
  const controller = new AbortController();
  return {
    call: axios.delete(`${API_URL}/remove_from_cart/${productId}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      signal: controller.signal,
    }),
    controller,
  };
};

export const getCart = (token: string) => {
  const controller = new AbortController();
  return {
    call: axios.get(`${API_URL}/get_cart`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      signal: controller.signal,
    }),
    controller,
  };
};

