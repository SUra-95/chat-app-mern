import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const {message} = req.body; // const message = req.body.message;
        const {id: receiverId} = req.params; //const id = req.params.id;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if (newMessage){
            conversation.messages.push(newMessage._id);
        }

        // SOCKET.IO funtionality goes here

        // in this way the newMessage have to wait untill the conversation is saved
        await conversation.save();
        await newMessage.save();

        // this will in run parallelly
        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in send message Controller", error.message);
        res.status(500).json({ error: "Internal Server Error"});
    }
}

export const getMessages =async  (req, res) => {
    try {
        
    } catch (error) {
        console.log("Error in get message Controller", error.message);
        res.status(500).json({ error: "Internal Server Error"});
    }
}