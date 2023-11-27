type UserRole = 'seller' | 'customer'

export interface User {
  id: number;
  username: string;
  role: UserRole;
  creationDate: string;
}