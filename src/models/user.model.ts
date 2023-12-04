type UserRole = 'Seller' | 'Customer'

export interface User {
  id: number;
  username: string;
  role: UserRole;
  creationDate: string;
  token: string;
}