import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from 'react-hot-toast';

const useSendMessage = () => {

    const [loading, setLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation();

    const sendMessage = async (messages) => {
        setLoading(true);
        try {
            const res = await fetch(`api/messages`)
        } catch (error) {
            toast.error(error.messages);
        } finally {
            setLoading(false);
        }
    }

};

export default useSendMessage;
