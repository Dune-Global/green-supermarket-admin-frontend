import { Category } from "@/types";

export async function getCategories(): Promise<Category[]> {
  const data = [
    {
      mainCategoryId: "1",
      mainCategoryName: "Vegetables",
      subCategories: "5",
    },
    {
      mainCategoryId: "2",
      mainCategoryName: "Fruits",
      subCategories: "3",
    },
    {
      mainCategoryId: "3",
      mainCategoryName: "Beverages",
      subCategories: "2",
    },
    {
      mainCategoryId: "4",
      mainCategoryName: "Desserts",
      subCategories: "7",
    },
    {
      mainCategoryId: "5",
      mainCategoryName: "Sweets",
      subCategories: "5",
    },
    {
      mainCategoryId: "6",
      mainCategoryName: "Vegetables",
      subCategories: "5",
    },
    {
      mainCategoryId: "7",
      mainCategoryName: "Fruits",
      subCategories: "3",
    },
    {
      mainCategoryId: "8",
      mainCategoryName: "Beverages",
      subCategories: "2",
    },
    {
      mainCategoryId: "9",
      mainCategoryName: "Desserts",
      subCategories: "7",
    },
    {
      mainCategoryId: "10",
      mainCategoryName: "Sweets",
      subCategories: "5",
    },
    {
      mainCategoryId: "11",
      mainCategoryName: "Desserts",
      subCategories: "7",
    },
    {
      mainCategoryId: "12",
      mainCategoryName: "Sweets",
      subCategories: "5",
    },
  ];

  return data;
}
