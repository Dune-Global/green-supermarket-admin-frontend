import { Item } from "@/types";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_AXIOS_BASE_URL!;
axios.defaults.baseURL = BASE_URL;

export const getItemDetails = async (): Promise<Item[]> => {
  try {
    const { data } = await axios.get("/products/all-products");

    // Map the API response to the desired format
    const newData = data.map((item: any) => {
      const unitLabel =
        item.measuringUnit.toLowerCase() === "kg" ? "KG" : "Unit";
      const formattedInStock =
        item.measuringUnit.toLowerCase() === "kg"
          ? `${item.stockAvailableUnits}${unitLabel}`
          : item.stockAvailableUnits;

      const formattedStockKeeping =
        item.measuringUnit.toLowerCase() === "kg"
          ? `${item.stockKeepingUnits}${unitLabel}`
          : item.stockKeepingUnits;

      return {
        id: item.productId.toString(),
        name: item.productName,
        price: `${item.currentPrice.toFixed(2)} (${unitLabel})`,
        unit: item.measuringUnit,
        inStock: `${formattedInStock} / ${formattedStockKeeping}`,
        stockKeeping:
          item.measuringUnit.toLowerCase() === "kg"
            ? formattedStockKeeping
            : item.stockKeepingUnits.toString(),
        brand: item.brand.brandName,
      };
    });

    return newData;
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    return [];
  }
};
