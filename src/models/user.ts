export type UserStatus = 'name' | 'email' | 'created_at' | 'client';
export interface IUser {
  id: number;
  name: string;
  email: string;
  user_type: 'ADM' | 'USER';
  userAdmin: [] | null;
  userClient: [] | null;
}
export interface IUserClient {
  id: number;
  name: string;
  email: string;
  user_type: 'USER';
  created_at: string;
  updated_at: string;
  userClient: {
    id: string;
    user_id: string;
    description: string;
    phone: string;
    kuba_product: string;
    birth_date: string;
    created_at: string;
    updated_at: string;
  }
}