import { User } from "../models";

export const authUserAdapter = (data: any): User => {
  return {
    id: data.data.user.id,
    username: data.data.user.username,
    role: data.data.user.role,
    creationDate: data.data.user.created_at,
    token: data.data.token
  };
};
