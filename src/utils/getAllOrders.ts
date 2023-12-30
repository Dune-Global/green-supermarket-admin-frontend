import axios from "axios";
import { Orders } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_AXIOS_BASE_URL!;
axios.defaults.baseURL = BASE_URL;

export const orderReviewDetails = async (): Promise<Orders[]> => {
  try {
    const response = await axios.get("/order/all");
    const apiData = response.data;

    const transformedData: Orders[] = apiData.map((order: any) => ({
      orderId: order.orderId.toString(),
      date: new Date(order.orderDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      total: order.totalAmount.toFixed(2),
      status: order.orderStatus.toLowerCase(),
    }));

    return transformedData;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};
