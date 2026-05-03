export type FieldType = "text" | "number" | "select";

// types/form.ts

export interface Field {
  _id?: string;
  label: string;
  type: FieldType;
  required: boolean;
  options: string[];
}


export interface FormValues {
  _id:string
    title: string;
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


export interface FormSubmission {
  _id: string;
  formId: string;
  data: Record<string, string>;
  createdAt: string;
  updatedAt: string;
  __v: number;
}