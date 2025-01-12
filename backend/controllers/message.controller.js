import { response } from "express";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

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
        
        // in this way the newMessage have to wait untill the conversation is saved
        await conversation.save();
        await newMessage.save();
        
        // this will in run parallelly
        await Promise.all([conversation.save(), newMessage.save()]);
        
        // SOCKET.IO funtionality goes here
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            // io.to(<socket_id>).emit() used to send the message to the specified client 
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }


        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in send message Controller", error.message);
        res.status(500).json({ error: "Internal Server Error"});
    }
}

export const getMessages = async (req, res) => {
    try {

        const {id: userToChatId} = req.params;
        const senderId = req.user._id;
        
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages"); // adding this populate part will return the actual messages rather than the ids of the messages

        if(!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(201).json(messages);

    } catch (error) {
        console.log("Error in get message Controller", error.message);
        res.status(500).json({ error: "Internal Server Error"});
    }
}