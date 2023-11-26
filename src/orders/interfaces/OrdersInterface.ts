import Product from "./ProductInterface";

interface OrderInterface {
  cartItems: Product[];
  orderTime: Date;
  status: string;
  price: number;
  shippingDetails: {
    address: string;
    userId: string;
    contactNumber: string;
    orderType: string;
  };
}

export default OrderInterface;
