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
];
