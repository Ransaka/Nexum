export interface Selling {
  category: string;
  textMessage?: string;
}

export interface SellerRelpy {
  userID: string;
  product: string;
  category: string;
  price: number;
  textMessage?: string;
}

export interface Product {
  element: string;
}

export interface Finalizing {
  productId: string;
  product: string;
  category: string;
  sellerName: string;
  customerId: string;
  price: number;
  tags: string;
  textMessage?: string;
  tax: number;
  quantity: number;
  total: number;
}
