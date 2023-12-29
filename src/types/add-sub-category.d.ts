type SubCat01FieldName =
  | "subcategoryid"
  | "subcategoryname"
  | "subcategorydescription";

export interface ISubCat01Form {
  id: number;
  name: SubCat01FieldName;
  label: string;
  placeholder: string;
}

export type SubCategoryResponse = {
  mainCategoryId: number;
  mainCategoryName: string;
};
