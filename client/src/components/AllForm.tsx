import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import { CopyOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { ShareAltOutlined } from '@ant-design/icons';
import type { Form } from '../types/global';
import FormPreviewModal from './ViewForm';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../global.constant';

const AllForm: React.FC = () => {
    const [items, setItems] = useState<Form[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedForm, setSelectedForm] = useState<Form | null>(null);
    const [link, setLink] = useState<{ link: string, id: string }>()
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const url = window.location.origin;



    useEffect(() => {
    const fetchDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get<Form[]>(
                `${baseUrl}/api/forms`
            );
            setItems(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

  fetchDetails();
}, []);

    const handleView = (record: Form) => {
        setSelectedForm(record);
        setOpen(true);
    };

    const handleEdit = (id: string) => {
        navigate(`/update/${id}`)
    }

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
        },
        {
            title: 'Fields Count',
            render: (_:string, record: Form) => record.fields.length,
        },
        {
            title: 'Fields',
            render: (_:string, record: Form) => (
                <>
                    {record.fields.map((field) => (
                        <Tag key={field._id}>
                            {field.label} ({field.type})
                        </Tag>
                    ))}
                </>
            ),
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            render: (date: string) => new Date(date).toLocaleString(),
        },
        {
            title: 'Actions',
            render: (_: string, record: Form) => (
                <div className='flex  gap-2'>
                    <EditOutlined
                        style={{ cursor: 'pointer', fontSize: 18 }}
                        onClick={() => handleEdit(record?._id)}
                    />
                    <EyeOutlined
                        style={{ cursor: 'pointer', fontSize: 18 }}
                        onClick={() => handleView(record)}
                    />
                    {link && record?._id === link?.id ? (
                        <CopyOutlined
                            style={{ cursor: 'pointer', fontSize: 18 }}
                            onClick={() => handleCopy(link.link)}
                        />
                    ) : (
                        <ShareAltOutlined
                            style={{ cursor: 'pointer', fontSize: 18 }}
                            onClick={() => handleShare(record?._id)}
                        />
                    )}

                </div>
            ),
        }
    ];


    const handleShare = (id: string) => {
        const generatedLink = `${url}/share/${id}`;
        setLink({ link: generatedLink, id });
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <>
            <Table
                rowKey="_id"
                dataSource={items}
                columns={columns}
                loading={loading}
            />

            <FormPreviewModal
                open={open}
                formData={selectedForm}
                onClose={() => {
                    setOpen(false);
                    setSelectedForm(null);
                }}
                onSubmit={(values) => {
                    console.log('Form submitted:', values);
                }}
            />
        </>
    );
};

export default AllForm;