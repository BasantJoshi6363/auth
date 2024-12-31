import mongoose from "mongoose"

export const db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to database")
    } catch (error) {
        console.log("Error connecting to database")
        process.exit(1)
    }
}