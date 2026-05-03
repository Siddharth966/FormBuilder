import { Select, Table, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const { Option } = Select;

const Responses = () => {
  const [forms, setForms] = useState([]);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchForms = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/forms");
      setForms(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  const fetchResponses = async (formId) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/api/responses/forms/response?formId=${formId}`
      );
      setResponses(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const columns =
    responses.length > 0
      ? [
          ...Object.keys(responses[0].data).map((key) => ({
            title: key,
            dataIndex: ["data", key],
            key: key,
          })),
          {
            title: "Submitted At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text) => new Date(text).toLocaleString(),
          },
        ]
      : [];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Select Form Responses</h2>


      <Select
        placeholder="Select Form"
        style={{ width: 300, marginBottom: 20 }}
        onChange={(value) => fetchResponses(value)}
      >
        {forms.map((form) => (
          <Option key={form._id} value={form._id}>
            {form.title}
          </Option>
        ))}
      </Select>

      {loading ? (
        <Spin />
      ) : (
        <Table
          dataSource={responses}
          columns={columns}
          rowKey="_id"
          bordered
        />
      )}
    </div>
  );
};

export default Responses;