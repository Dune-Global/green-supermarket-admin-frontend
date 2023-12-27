import { Moderator } from "@/types";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_AXIOS_BASE_URL!;
axios.defaults.baseURL = BASE_URL;

export async function getModerators(): Promise<Moderator[]> {
  const { data } = await axios.get("/admins");

  const newData = data.map((item: any) => ({
    empId: item.empId,
    name: `${item.firstname} ${item.lastname}`,
    email: item.email,
    designation: item.designation,
  }));

  console.log(newData);

  return newData;
}
