const Message = require("../models/MessagesModel");
const Conversation = require("../models/Conversationmodel");
const {  getReceiverSocketId, io } = require("../../server");


const createMessage = async (req, res) => {
  const { message } = req.body;
  const {id: receiverId} = req.params;
  const senderId = req.user._id;

  console.log("Receiver ID:", receiverId);
  console.log("Sender ID:", senderId);
  console.log("Message:", message);
  try {
   const conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if(!conversation){
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }

      const newMessage = await Message.create({
      senderId,
      message,
      receiverId,
    });

    conversation.messages.push(newMessage._id);
    await Promise.all([conversation.save(), newMessage.save()]);
    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage",newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getMessages = async (req, res) => {
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  try {
    const conversation= await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      return res.status(200).json([]); // No conversation means no messages
    }

   const messages = conversation.messages.length ? await Message.find({
      _id: { $in: conversation.messages },
    }).sort({ createdAt: 1 }) : [];
   res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMessage,
  getMessages,
};
