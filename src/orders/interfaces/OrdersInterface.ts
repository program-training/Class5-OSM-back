import Product from "../../products/interfaces/ProductsInterface";

interface OrderInterface {
  cartItems: Product[];
  orderTime: Date;
  status: string;
  Price: number;
  shippingDetails: {
    address: string;
    userId: number;
    contactNumber: string;
    orderType: string;
  };
}

export default OrderInterface;
