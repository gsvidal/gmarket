import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("http://127.0.0.1:8000/register", () => {
    // Note that you DON'T have to stringify the JSON!
    return HttpResponse.json({
        "message": "User created successfully",
        "user": {
          "id": 123,
          "username": "example_user",
          "role": "Seller",
          "created_at": "2023-11-21T20:56:27.133Z" // format this to dd/mm/yyyy
        },
        "token": "abcdefg"
    });
  }),
  
  http.get("http://127.0.0.1:8000/seller_dashboard/:id", () => {
    // Note that you DON'T have to stringify the JSON!
    return HttpResponse.json({"message": "Seller dashboard data retrieved successfully", "products": [
      {
        "id": 1,
        "product_name": "Product 1",
        "description": "This is a description for Product 1",
        "price": 99.99,
        "stock_quantity": 10,
        "images": [],
        "category": {
          "id": 1,
          "name": "Category 1"
        },
        "seller": {
          "id": 1,
          "name": "Seller 1"
        }
      },
      // Add more products as needed
    ]});
  }),
];
