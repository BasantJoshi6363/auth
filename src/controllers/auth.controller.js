import { User } from "../models/users.models.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
export const signUp = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            return res.json({ message: "Please provide user, email and password" });
        }
        // Check if user exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.json({ message: "User already exists" });
        }
        const verificatonToken = Math.floor(100000 + Math.random() * 900000);
        //hash password
        console.log("first")
        const hashPassword = await bcrypt.hash(password, 10);

        //create user
        const user = await User.create({ name, email, password: hashPassword, verificatonToken : verificatonToken, verificationTokenExpire: Date.now() + 10 * 60 * 1000 });
        generateToken(res, user._id);

       delete user.password;
       delete user.verificatonToken;
        return res.json({ message: true, user });
    } catch (error) {
        return res.json({ message: error.message });
    }
};

export const findSpecificUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id);
        if (!user) {
            return res.json({ message: "User not found" });
        }
        return res.json({ message: true, user });
    } catch (error) {
        return res.json({ message: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        return res.json({ message: true, users });
    } catch (error) {
        return res.json({ message: error.message });
    }
};
export const signIn = async (req, res) => { 
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: "Please provide email and password" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ message: "Invalid credentials" });
        }
        generateToken(res, user._id);
        delete user.password;
        return res.json({ message: true, user });
    } catch (error) {
        return res.json({ message: error.message });
    }
};
export const signOut = async (req, res) => { };
export const deleteAllUser = async (req, res) => { 
    try {
        await User.deleteMany({});
        return res.json({ message: true });
    } catch (error) {
        return res.json({ message: error.message });
    }
};

