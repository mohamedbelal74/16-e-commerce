export interface Cart {
  _id: string;
  products: {
    product: {
      _id: string;
      title: string;
      imageCover: string;
      price: number;
    };
    count: number;
    price: number;
    _id: string;
  }[];
  totalCartPrice: number;
  cartOwner: string;
  createdAt?: string;
  updatedAt?: string;
}
