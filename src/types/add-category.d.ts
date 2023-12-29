type CategoryFormFieldName = "categoryid" | "categoryname" | "description";

export interface ICategoryFormMainDetails {
  id: number;
  categoryName: CategoryFormFieldName;
  categoryLabel: string;
  categoryPlaceholder: string;
}

export type Category = {
  mainCategoryId: string;
  mainCategoryName: string;
  subCategories: string;
};

export type MainCategory = {
  mainCategoryId: number;
  mainCategoryName: string;
  // slug: string;
  // mainCategoryDesc: string;
  // imgUrl: string;
};

export type CategoryResponse = {
  mainCategoryId: number;
  mainCategoryName: string;
  categoryOnes: number[];
};
