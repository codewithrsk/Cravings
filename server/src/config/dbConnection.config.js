import mongoose from "mongoose";

const conssectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Mongo DB connected successfully");
    console.log("DB Host :" ,conn.connection.host);
    console.log("DB Name :" ,conn.connection.name);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default conssectDB;