import { app } from "./app";
import connectDB from "./utils/db";
require("dotenv").config();


// Create server
app.listen(process.env.NODE_PORT, () => {
    console.log(`Server is connected with port ${process.env.NODE_PORT}`);
    connectDB();
})