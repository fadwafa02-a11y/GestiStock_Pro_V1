export type UserRole = 'admin' | 'employee';

export interface User {
  id: string;
  username: string;
  password: string;
  role: UserRole;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  supplierId: string;
  price: number;
  quantity: number;
  minQuantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface StockMovement {
  id: string;
  productId: string;
  type: 'in' | 'out';
  quantity: number;
  date: string;
  reason: string;
  user: string;
}

export type View = 
  | 'dashboard' 
  | 'products' 
  | 'categories' 
  | 'suppliers' 
  | 'stock' 
  | 'alerts' 
  | 'reports' 
  | 'users';
