import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import connectDB from './src/config/database.js';
import MasterProperty from './src/models/MasterProperty.model.js';

async function run() {
    await connectDB();
    const prop = await MasterProperty.findOne();
    console.log("One Property Sample:");
    console.log(JSON.stringify(prop, null, 2));
    process.exit(0);
}
run();
