import { http, HttpResponse } from "msw";

const API_URL = import.meta.env.VITE_API_URL as string;

export const handlers = [
  http.post(`${API_URL}/register`, () => {
    // Note that you DON'T have to stringify the JSON!
    return HttpResponse.json({
      message: "User created successfully",
      user: {
        id: 123,
        username: "example_user",
        role: "Seller",
        created_at: "2023-11-21T20:56:27.133Z", // format this to dd/mm/yyyy
      },
      token: "abcdefg",
    });
  }),

  http.get(`${API_URL}/seller_dashboard/:id`, () => {
    // Note that you DON'T have to stringify the JSON!
    return HttpResponse.json({
      message: "Seller dashboard data retrieved successfully",
      products: [
        {
          id: 1,
          product_name: "Product 1",
          description: "This is a description for Product 1",
          price: 199.99,
          stock_quantity: 10,
          images: [],
          category: {
            id: 1,
            name: "Category 1",
          },
          seller: {
            id: 1,
            name: "Seller 1",
          },
        },
        {
          id: 2,
          product_name: "Product 2",
          description: "This is a description for Product 2",
          price: 299.99,
          stock_quantity: 20,
          images: [],
          category: {
            id: 3,
            name: "Category 3",
          },
          seller: {
            id: 1,
            name: "Seller 1",
          },
        },
        // Add more products as needed
      ],
    });
  }),

  http.get(`${API_URL}/categories`, () => {
    // Note that you DON'T have to stringify the JSON!
    return HttpResponse.json({
      message: "Categories retrieved successfully",
      categories: [
        {
          id: 1,
          name: "Technology",
          code: "tech",
        },
        {
          id: 2,
          name: "Fashion",
          code: "fashion",
        },
        {
          id: 3,
          name: "Grocery",
          code: "grocery",
        },
        {
          id: 4,
          name: "Books",
          code: "books",
        },
        {
          id: 5,
          name: "Music",
          code: "music",
        },
        {
          id: 6,
          name: "Sports",
          code: "sports",
        },
        {
          id: 7,
          name: "Games",
          code: "games",
        },
        {
          id: 8,
          name: "No Category",
          code: "no-category",
        },
      ],
    });
  }),

  http.get(`${API_URL}/all_products`, () => {
    // Note that you DON'T have to stringify the JSON!
    return HttpResponse.json({
      message: "All products retrieved successfully",
      products: [
        {
          id: 1,
          product_name: "Product 1",
          description: "This is a description for Product 1",
          price: 199.99,
          stock_quantity: 10,
          images: [],
          category: {
            id: 1,
            name: "Category 1",
          },
          seller: {
            id: 1,
            name: "Seller 1",
          },
        },
        {
          id: 2,
          product_name: "Product 3",
          description: "This is a description for Product 3",
          price: 399.99,
          stock_quantity: 30,
          images: [],
          category: {
            id: 3,
            name: "Category 3",
          },
          seller: {
            id: 3,
            name: "Seller 3",
          },
        },
        // Add more products as needed
      ],
    });
  }),
];
