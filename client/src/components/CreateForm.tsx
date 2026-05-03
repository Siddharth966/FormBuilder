import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Card, Space } from "antd";
import type { Field, FormPayload, FormValues } from "../types/global";
import axios from "axios";
import { useGlobalMessage } from "../services/MessageProvider";
import { useParams } from "react-router-dom";
import { baseUrl } from "../global.constant";

const { Option } = Select;

type FieldType = "text" | "number" | "select";

const CreateForm: React.FC = () => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState<Field[]>([]);
  const { id } = useParams();
  const { success, error } = useGlobalMessage();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/forms/${id}`,
        );
        const data = response.data;

        form.setFieldsValue({ title: data.title });

        if (data.fields && Array.isArray(data.fields)) {
          setFields(data.fields);
        }
      } catch (err) {
        console.error(err);
        error("Failed to fetch form details");
      }
    };
    if (id) {
      fetchDetails();
    }
  }, [id]);

  const addField = () => {
    setFields([
      ...fields,
      { label: "", type: "text", required: false, options: [] },
    ]);
  };

  const updateField = <K extends keyof Field>(
    index: number,
    key: K,
    value: Field[K],
  ) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  const addOption = (index: number) => {
    const updated = [...fields];
    updated[index].options = [...(updated[index].options || []), ""];
    setFields(updated);
  };

  const updateOption = (
    fieldIndex: number,
    optionIndex: number,
    value: string,
  ) => {
    const updated = [...fields];
    if (updated[fieldIndex].options) {
      updated[fieldIndex].options![optionIndex] = value;
    }
    setFields(updated);
  };

  const handleSubmit = async (values: FormValues) => {
    const payload: FormPayload = {
      title: values.title,
      fields,
    };

    console.log("Payload:", payload);

    if (id) {
      await axios.put(`${baseUrl}/api/forms/${id}`, payload);
      success("Form Updated Successfully");
    } else {
      await axios.post(`${baseUrl}/api/forms`, payload);
      success("Form Created Successfully");
    }
  };

  return (
    <Card title={id ? "Update Form" : "Create Form"}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="title"
          label="Form Title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input placeholder="Enter form title" />
        </Form.Item>

        {fields.map((field, index) => (
          <Card key={index} style={{ marginBottom: 10 }}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                placeholder="Field Label"
                value={field.label}
                onChange={(e) => updateField(index, "label", e.target.value)}
              />

              <Select
                value={field.type}
                onChange={(value: FieldType) =>
                  updateField(index, "type", value)
                }
              >
                <Option value="text">Text</Option>
                <Option value="number">Number</Option>
                <Option value="select">Select</Option>
              </Select>

              {field.type === "select" && (
                <div>
                  {field.options?.map((opt, i) => (
                    <Input
                      key={i}
                      placeholder={`Option ${i + 1}`}
                      value={opt}
                      onChange={(e) => updateOption(index, i, e.target.value)}
                      style={{ marginBottom: 5 }}
                    />
                  ))}
                  <Button onClick={() => addOption(index)}>Add Option</Button>
                </div>
              )}

              <Button
                type={field.required ? "primary" : "default"}
                onClick={() => updateField(index, "required", !field.required)}
              >
                {field.required ? "Required" : "Optional"}
              </Button>
            </Space>
          </Card>
        ))}

        <Button type="dashed" onClick={addField} style={{ marginBottom: 20 }}>
          + Add Field
        </Button>

        <br />

        <Button type="primary" htmlType="submit">
          {id ? "Update Form" : "Create Form"}
        </Button>
      </Form>
    </Card>
  );
};

export default CreateForm;
