import { MainCategory } from "@/types";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_AXIOS_BASE_URL!;
axios.defaults.baseURL = BASE_URL;

export async function getMainCategories(): Promise<MainCategory[]> {
  const { data } = await axios.get("/main-category/all-categories");
  console.log(data + "getMainCategories Data");

  const newData = data.map((item: any) => ({
    mainCategoryId: item.mainCategoryId,
    mainCategoryName: item.mainCategoryName,
  }));

  console.log(newData + "getMainCategories New Data");

  return newData;
}
