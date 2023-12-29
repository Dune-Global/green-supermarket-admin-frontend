export interface ICategoryTwo {
  subCatTwoId: number;
  subCatTwoName: string;
  subCatTwoDescription: string;
  subCatOneId: number;
}

export interface ICategoryOne {
  subCatOneId: number;
  subCatOneName: string;
  subCatOneDescription: string;
  mainCategoryId: number;
  categoryTwos: ICategoryTwo[];
}

export interface IMainCategory {
  mainCategoryId: number;
  mainCategoryName: string;
  mainCategoryDesc: string;
  imgUrl: string;
  categoryOnes: ICategoryOne[];
}
