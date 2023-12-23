import { IModeratorForm } from "@/types";
import { IModeratorRadio } from "@/types/moderator-radio";

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

export const moderatorRadioItems: IModeratorRadio[] = [
  {
    id: 1,
    value: "ADMIN",
    labelName: "Add Item",
  },
  {
    id: 2,
    value: "MANAGER",
    labelName: "Check Order",
  },
  {
    id: 3,
    value: "ASSISTANT",
    labelName: "Delivery Status",
  },
];
