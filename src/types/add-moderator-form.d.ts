type FormFieldName =
  | "firstname"
  | "lastname"
  | "empId"
  | "designation"
  | "email"
  | "phoneNumber"
  | "password"
  | "confirmpassword";

export interface IModeratorForm {
  id: number;
  col1Name: FormFieldName;
  col1Label: string;
  col1Type: string;
  col1Placeholder: string;
  col2Name: FormFieldName;
  col2Label: string;
  col2Type: string;
  col2Placeholder: string;
}
