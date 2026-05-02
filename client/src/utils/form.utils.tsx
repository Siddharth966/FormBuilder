import { Input, Select } from 'antd';
import type { Field } from '../types/global';

export const renderField = (field: Field) => {
  switch (field.type) {
    case 'text':
      return <Input placeholder={field.label} />;

    case 'number':
      return <Input type="number" placeholder={field.label} />;

    case 'select':
      return (
        <Select placeholder={field.label}>
          {field.options.map((opt, i) => (
            <Select.Option key={i} value={opt}>
              {opt}
            </Select.Option>
          ))}
        </Select>
      );

    default:
      return null;
  }
};