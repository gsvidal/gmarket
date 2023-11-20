import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/register", () => {
    // Note that you DON'T have to stringify the JSON!
    return HttpResponse.json({
        "message": "User created successfully",
        "user": {
          "id": 123,
          "username": "example_user",
          "email": "user@example.com",
          "role": "seller",
          "created_at": "17/11/2023" // format this to dd/mm/yyyy
        }
    });
  }),
];
