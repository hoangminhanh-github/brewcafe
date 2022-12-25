export interface IUser {
  id: number | string;
  permission: string;
  email: string;
  password: string;
  name: string;
  age: number;
  avatar?: string | null;
  lastLogin?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}
