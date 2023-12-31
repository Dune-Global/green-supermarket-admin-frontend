export type Orders = {
  orderId: string;
  date: string;
  total: string;
  status: string;
};

interface OrderItem {
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  discount: number;
  totalAmount: number;
}

interface Address {
  firstName: string;
  lastName: string;
  address: string;
  province: string;
  city: string;
  postalCode: string;
  email: string;
  phoneNumber: string;
}

export interface ApiResponse {
  billingAddress: Address;
  shippingAddress: Address;
  orderItems: OrderItem[];
  note: null | string;
  orderStatus: string;
}
