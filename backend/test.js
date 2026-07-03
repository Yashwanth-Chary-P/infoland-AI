import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import connectDB from './src/config/database.js';
import MasterProperty from './src/models/MasterProperty.model.js';

async function run() {
    await connectDB();
    const regions = await MasterProperty.distinct('source_region');
    console.log("Regions in DB:", regions);
    process.exit(0);
}
run();
