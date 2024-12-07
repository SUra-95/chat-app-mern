import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res, next) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Hashpassword here
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        // https://avatar.iran.liara.run
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;


        const newUser = new User({
            fullName,
            username,
            password: hashPassword,
            gender,
            profilePic: "male" ? boyProfilePic : girlProfilePic
        });

        if (newUser) {
            // Generate JWT token here
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
        } else {
            res.status(400).json({ error: 'Invalid username data' });
        }


    } catch (error) {
        console.log("Error in Signup controller", error.message);
        res.status(500).json({ error: error.message });
    }
}
export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            res.status(400).json({ error: "username or password is invalid" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        });

    } catch (error) {
        console.log("Error in Login controller", error.message);
        res.status(500).json({ error: error.message });
    }
}
export const logout = async (req, res, next) => {
    try {
        res.cookie("jwt", "" , {maxAge:0});
        res.status(200).json({message: "User logged out successfully"});
    } catch (error) {
        console.log("Error in Logout controller", error.message);
        res.status(500).json({ error: error.message });
    }
}