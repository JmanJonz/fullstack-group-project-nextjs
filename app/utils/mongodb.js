import mongoose from "mongoose";
const { MONGODB_URL } = process.env;

export function connect() {
  // Connecting to the database
  mongoose
    .connect(`${MONGODB_URL}`, {})
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
}

export function Disconnect() {
  // Connecting to the database
  mongoose
    .disconnect(`${MONGODB_URL}`, {})
    .then(() => {
      console.log("Successfully disconnected from database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
}
