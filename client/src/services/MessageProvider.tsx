// providers/MessageProvider.tsx
import React, { createContext, useContext } from 'react';
import { message } from 'antd';

type MessageContextType = {
    success: (msg: string) => void;
    error: (msg: string) => void;
    info: (msg: string) => void;
};

const MessageContext = createContext<MessageContextType | null>(null);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [messageApi, contextHolder] = message.useMessage();

    const value: MessageContextType = {
        success: (msg) => messageApi.success(msg),
        error: (msg) => messageApi.error(msg),
        info: (msg) => messageApi.info(msg),
    };

    return (
        <MessageContext.Provider value={value}>
            {contextHolder}
            {children}
        </MessageContext.Provider>
    );
};

export const useGlobalMessage = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error('useGlobalMessage must be used inside MessageProvider');
    }
    return context;
};