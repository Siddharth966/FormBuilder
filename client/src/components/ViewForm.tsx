// components/FormPreviewModal.tsx
import React from 'react';
import { Modal, Form as AntForm, Input, Select, Button } from 'antd';
import type { Field, Form } from '../types/global';

interface Props {
    open: boolean;
    formData: Form | null;
    onClose: () => void;
    onSubmit?: (values: any) => void;
}

const FormPreviewModal: React.FC<Props> = ({
    open,
    formData,
    onClose,
    onSubmit,
}) => {
    const [form] = AntForm.useForm();

    const renderField = (field: Field) => {
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

    return (
        <Modal
            title={formData?.title}
            open={open}
            onCancel={() => {
                form.resetFields();
                onClose();
            }}
            footer={null}
        >
            {formData && (
                <AntForm
                    form={form}
                    layout="vertical"
                    onFinish={(values) => onSubmit?.(values)}
                >
                    {formData.fields.map((field) => (
                        <AntForm.Item
                            key={field._id}
                            name={field.label} 
                            label={field.label}
                            rules={[
                                {
                                    required: field.required,
                                    message: `${field.label} is required`,
                                },
                            ]}
                        >
                            {renderField(field)}
                        </AntForm.Item>
                    ))}

                    <Button type="primary" htmlType="submit" block>
                        Submit
                    </Button>
                </AntForm>
            )}
        </Modal>
    );
};

export default FormPreviewModal;