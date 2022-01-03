import mongoose from "mongoose";

const connection = {};

async function connect() {

    if (connection.isConnected) {
        console.log("alredy connect");
        return;
    }

    // if (mongoose.connection.length > 0) {
    //     connection.isConnected = mongoose.connections[0].readyState;

    //     if (connection.isConnected === 1) {
    //         console.log("use priviouse connection");
    //         return;
    //     }
    // }

    const db = await mongoose.connect(process.env.MONGODB_URI, {

        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log("new Connection")

    connection.isConnected = db.connections[0].readyState;
}



const db = { connect };

export default db;