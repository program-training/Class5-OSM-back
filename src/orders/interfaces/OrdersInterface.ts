import Product from "./ProductInterface";

interface OrderInterface {
  cartItems: Product[];
  orderTime: Date;
  status: string;
  price: number;
  shippingDetails: {
    address: string;
    userId: number;
    contactNumber: string;
    orderType: string;
  };
}

export default OrderInterface;
