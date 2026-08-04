export type UserRole = 'admin' | 'customer';

export interface Profile {
  id: string;
  full_name: string | null;
  email: string;
  phone: string | null;
  role: UserRole;
  avatar_url: string | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discount_price: number | null;
  sku: string;
  stock_quantity: number;
  category_id: string;
  images: string[];
  specifications: any;
  status: 'active' | 'draft' | 'out_of_stock';
  is_featured: boolean;
}
