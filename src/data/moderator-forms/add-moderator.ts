import { IModeratorForm } from "@/types";

export const addModeratorFormRows: IModeratorForm[] = [
  {
    id: 1,
    col1Name: "firstname",
    col1Label: "First Name",
    col1Type: "text",
    col1Placeholder: "John",
    col2Name: "lastname",
    col2Label: "Last Name",
    col2Type: "text",
    col2Placeholder: "Doe",
  },
  {
    id: 2,
    col1Name: "empId",
    col1Label: "Employee ID",
    col1Type: "text",
    col1Placeholder: "GS284",
    col2Name: "designation",
    col2Label: "Designation",
    col2Type: "text",
    col2Placeholder: "Manager",
  },
  {
    id: 3,
    col1Name: "email",
    col1Label: "Email",
    col1Type: "email",
    col1Placeholder: "johndoe@gmail.com",
    col2Name: "phoneNumber",
    col2Label: "Phone Number",
    col2Type: "text",
    col2Placeholder: "0123456789",
  },
];
