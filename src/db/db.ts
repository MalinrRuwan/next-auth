import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });
    connection.on("error", (err) => {
      console.log("Something error happened" + err);
    });
  } catch (e) {
    console.log("Something goes wrong");
    console.log(e);
  }
}
