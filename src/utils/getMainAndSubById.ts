import { IMainCategory, ICategoryOne, ICategoryTwo } from "@/types";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_AXIOS_BASE_URL!;
axios.defaults.baseURL = BASE_URL;

export async function getMainAndSubById(
  param: number
): Promise<IMainCategory[]> {
  const { data } = await axios.get(`/main-category/subs/${param}`);

  console.log("Complete data[0]:", data[0]);

  const newData: IMainCategory[] = data.map((mainCategory: any) => {
    console.log("Main Category:", mainCategory);

    const categoryOnes: ICategoryOne[] = mainCategory.categoryOnes.map(
      (categoryOne: any) => {
        console.log("Category One:", categoryOne);

        const categoryTwos: ICategoryTwo[] = Array.isArray(
          categoryOne.categoryTwos
        )
          ? categoryOne.categoryTwos.map((categoryTwo: any) => {
              console.log("Category Two:", categoryTwo);

              return {
                subCatTwoId: categoryTwo.subCatTwoId,
                subCatTwoName: categoryTwo.subCatTwoName,
                subCatTwoDescription: categoryTwo.subCatTwoDescription,
                subCatOneId: categoryTwo.subCatOneId,
              };
            })
          : [];

        return {
          subCatOneId: categoryOne.subCatOneId,
          subCatOneName: categoryOne.subCatOneName,
          subCatOneDescription: categoryOne.subCatOneDescription,
          mainCategoryId: categoryOne.mainCategoryId,
          categoryTwos,
        };
      }
    );

    return {
      mainCategoryId: mainCategory.mainCategoryId,
      mainCategoryName: mainCategory.mainCategoryName,
      mainCategoryDesc: mainCategory.mainCategoryDesc,
      imgUrl: mainCategory.imgUrl,
      categoryOnes,
    };
  });

  return newData;
}
