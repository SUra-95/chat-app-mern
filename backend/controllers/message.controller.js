export const sendMessage = (req, res) => {
    try {
        const {message} = req.body; // const message = req.body.message;
        const {id: receiverId} = req.params; //const id = req.params.id;
        const senderId = req.user._id;


    } catch (error) {
        console.log("Error in message Controller", error.message);
        res.status(500).json({ error: "Internal Server Error"});
    }
};