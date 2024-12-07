import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';

export const signup = async (req, res, next) => {
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({error: "Passwords do not match"});
        }

        // Hashpassword here
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await User.findOne({username});

        if (user) {
            return res.status(400).json({error: "User already exists"});
        }

        // https://avatar.iran.liara.run
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;


        const newUser = new User({
            fullName,
            username,
            password: hashPassword,
            gender,
            profilePic: "male" ? boyProfilePic :girlProfilePic
        });

        await newUser.save();

        return res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic
        });

    } catch (error) {
        console.log("Error in Signup controller", error.message);
        res.status(500).json({error: error.message});
    }    
}
export const login = (req, res, next) => {
    console.log("Login User");
}
export const logout = (req, res, next) => {
    console.log("Logout User");
}