import { useState, useEffect } from 'react';
import { Form as AntForm, Button } from 'antd';
import axios from 'axios';
import type { Field } from '../types/global';
import { useGlobalMessage } from '../services/MessageProvider';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../global.constant';

const FillForm = () => {
    const [form] = AntForm.useForm();
    const [fields, setFields] = useState<Field[]>([]);
    const [formTitle, setFormTitle] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const { id } = useParams();
    const { error } = useGlobalMessage();

    

    useEffect(() => {
        const fetchDetails = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/forms/${id}`);
            const data = response.data;
            setFormTitle(data.title);
            if (data.fields && Array.isArray(data.fields)) {
                setFields(data.fields);
            }
        } catch (err:unknown) {
            console.error(err)
            error('Failed to fetch form details');
        }
    };
        if (id) fetchDetails();
    }, [id]);

    const handleSubmit = async (values: Record<string, unknown>) => {
        try {
            setSubmitting(true);
            await axios.post(`${baseUrl}/api/responses`, {
                formId: id,
                data: values,
            });
            setSubmitted(true);
        } catch (err) {
            console.error(err)
            error('Failed to submit form');
        } finally {
            setSubmitting(false);
        }
    };

    const renderField = (field: Field) => {
        const baseClass = "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all bg-white";

        switch (field.type) {
            case 'number':  
                return (
                    <input
                        type="number"
                        className={baseClass}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                );
            case 'select':
                return (
                    <select name={field.label} aria-label={field.label} className={`${baseClass} cursor-pointer`}>
                        <option value="" disabled>Choose an option</option>
                        {field.options?.map((opt, i) => (
                            <option key={i} value={opt}>{opt}</option>
                        ))}
                    </select>
                );
            default:
                return (
                    <input
                        type="text"
                        className={baseClass}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                );
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-serif font-normal text-gray-900 mb-1">Response recorded</h2>
                    <p className="text-sm text-gray-500">Thank you for taking the time to fill this out.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

                <h1 className="text-2xl font-semibold text-gray-900 mb-1">{formTitle}</h1>
                <p className="text-sm text-gray-400 mb-6">
                </p>
                <hr className="border-gray-100 mb-6" />

                <AntForm form={form} layout="vertical" onFinish={handleSubmit} className="space-y-5">
                    {fields.map((field) => (
                        <AntForm.Item
                            key={field._id}
                            name={field.label}
                            label={
                                <span className="">
                                    {field.label}
                                    {/* {field.required && <span className='text-red-500'>*</span>} */}
                                </span>
                            }
                            rules={[{
                                required: field.required,
                                message: `${field.label} is required`,
                            }]}
                        >
                            {renderField(field)}
                        </AntForm.Item>
                    ))}

                    <div className="flex justify-end">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={submitting}
                            className="!bg-blue-600 !border-blue-600 hover:!bg-blue-700 !rounded-lg !px-6 !text-sm !font-medium"
                        >
                            Submit
                        </Button>
                    </div>
                </AntForm>
            </div>
        </div>
    );
};

export default FillForm;