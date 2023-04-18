import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@clusterscientific.d3ni8qx.mongodb.net/?retryWrites=true&w=majority`);

        console.log("Database is connected!");
    } catch (error) {
        console.error(error);
    }
}

export default connectDb;