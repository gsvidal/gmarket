import { User } from "../models";

export const authUserAdapter = (data: any): User => {
  return {
    id: data.user.id,
    username: data.user.username,
    role: data.user.role,
    creationDate: data.user.created_at,
    token: data.token
  };
};
