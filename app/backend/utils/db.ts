import mongoose from "mongoose";
require("dotenv").config();

const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
} = process.env;

const db_url: string = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin` || "";
console.log(db_url);


const connectDB = async () => {
    try {
        console.log("Start Check db configuration")
        await mongoose.connect(db_url).then((data: any) => {
            console.log(`Database connected with ${data.connection.host}`)
        })
        console.log("End Check db configuration")
    } catch (error: any) {
        console.log(error.message)
        setTimeout(connectDB, 5000);
    }
}

export default connectDB;