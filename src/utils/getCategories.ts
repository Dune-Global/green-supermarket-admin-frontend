import { Category, CategoryResponse } from "@/types";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_AXIOS_BASE_URL!;
axios.defaults.baseURL = BASE_URL;

export async function getCategories(): Promise<Category[]> {
  const { data } = await axios.get("/main-category/main-categories-with-sub");

  const newData = data.map((item: CategoryResponse) => ({
    mainCategoryId: item.mainCategoryId,
    mainCategoryName: item.mainCategoryName,
    subCategories: item.categoryOnes.length,
  }));

  return newData;
}
