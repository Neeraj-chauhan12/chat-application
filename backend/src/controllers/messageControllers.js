const Message = require("../models/MessagesModel");
const Conversation = require("../models/Conversationmodel");

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

   const messages = conversation.messages;;
   res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMessage,
  getMessages,
};
