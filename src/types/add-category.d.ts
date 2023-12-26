type CategoryFormFieldName =
  | "categoryid"
  | "categoryname"
  | "description"
  | "category1id"
  | "category1name"
  | "category2id"
  | "category2name";

export interface ICategoryFormMainDetails {
  id: number;
  categoryName: CategoryFormFieldName;
  categoryLabel: string;
  categoryPlaceholder: string;
}
