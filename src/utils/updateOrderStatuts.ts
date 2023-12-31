import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_AXIOS_BASE_URL!;
axios.defaults.baseURL = BASE_URL;

export const updateOrderStatus = async (
  orderId: string,
  status: string
): Promise<any> => {
  const reqBody = {
    orderStatus: status,
  };
  try {
    const res = await axios.patch(`/order/order-status/${orderId}`, reqBody);
    console.log(res);
    return res;
  } catch (error) {
    console.error("Error updating order status:", error);
    return error;
  }
};
