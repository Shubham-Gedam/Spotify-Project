import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config/config.js";
import {publishToQueue} from "../broker/rabbit.js";


export async function register(req, res) {

    const { email,password, fullname:{firstname, lastname} } = req.body;

    const isUserAleadyExist = await userModel.findOne({ email });
    if (isUserAleadyExist) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = new userModel({
        email,
        password: hash,
        fullname: {
            firstname,
            lastname
        }
    });
    await user.save();

    const token = jwt.sign({
        id: user._id,
        role: user.role,
    }, config.JWT_SECRET, { expiresIn: '2d' });

    publishToQueue("USER_REGISTERED", {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
        role: user.role
    });

   res.cookie("token", token )

   res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            email: user.email,
            fullname: user.fullname
        }
    });
}


export async function googleAuthCallback (req,res) {
    
    const user = req.user;

    const isUserAleadyExist = await userModel.findOne({ 
        $or:[
            { email: user.emails[0].value },
            { googleId: user.id }
        ] 
    });


    if (isUserAleadyExist) {

        const token = jwt.sign({
            id: isUserAleadyExist._id,
            role: isUserAleadyExist.role,
        }, config.JWT_SECRET, { expiresIn: '2d' });
         res.cookie("token", token );

         return res.status(200).json({
            message: "User logged in successfully",
            user:{
                id: isUserAleadyExist._id,
                email: isUserAleadyExist.email,
                fullname: isUserAleadyExist.fullname,
                role: isUserAleadyExist.role,
            }
         })
    }

    const newUser = new userModel({
        googleId: user.id,
        email: user.emails[0].value,
        fullname: {
            firstname: user.name.givenName,
            lastname: user.name.familyName
        }
    })
    await newUser.save();

    const token = jwt.sign({
        id: newUser._id,
        role: newUser.role,
    }, config.JWT_SECRET, { expiresIn: '2d' });

    await publishToQueue("USER_REGISTERED", {
        id: newUser._id,
        email: newUser.email,
        fullname: newUser.fullname,
        role: newUser.role
    });

    res.cookie("token", token);

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: newUser._id,
            email: newUser.email,
            fullname: newUser.fullname,
            role: newUser.role
        }
    });

}