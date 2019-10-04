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
