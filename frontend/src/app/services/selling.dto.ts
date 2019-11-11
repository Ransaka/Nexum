export interface Selling {
  category: string;
  product: string;
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
  sellerId: string;
  sellerName: string;
  sellerUsername?: string;
  price: number;
  tags: string;
  textMessage?: string;
}
