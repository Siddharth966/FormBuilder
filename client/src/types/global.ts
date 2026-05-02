export type FieldType = "text" | "number" | "select";

// types/form.ts

export interface Field {
  _id: string;
  label: string;
  type: FieldType;
  required: boolean;
  options: string[];
}

export interface Form {
  _id: string;
  title: string;
  fields: Field[];
  createdAt: string;
  updatedAt: string;
}

export interface FormPayload {
  title: string;
  fields: Field[];
}
