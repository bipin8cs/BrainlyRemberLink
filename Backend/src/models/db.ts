import mongoose, { model, Schema } from 'mongoose';

const connectDb = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL || "mongodb+srv://pradhanbipina27:d4mA4R0YyvTnU8Rv@cluster0.nwb4jnn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    } catch (e: any) {
        console.log("Error in connect in Mongodb", e.message)
    }

}
export default connectDb;



// 1. Users table
// 2. Content Table
// 3. Shareable Link Table
// 4. Tags