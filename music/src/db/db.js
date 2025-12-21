import mongoose from 'mongoose';
import config  from '../config/config.js';


async function connectDB(){
    try {
        await mongoose.connect(config.MONGO_URI);

        console.log("mongoDB connected");
        
    } catch (error) {
        console.log("failed to connect mongoDB", error);
        
    }
}

export default connectDB;