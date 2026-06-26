import mongoose from 'mongoose';

const connectDB = async (retries = 5) => {
    while (retries) {
        try {
            const uri = process.env.MONGODB_URI;
            if (!uri) {
                throw new Error("MONGODB_URI is not defined in environment variables");
            }
            
            await mongoose.connect(uri);
            
            console.log(`[MongoDB] Connected successfully to host: ${mongoose.connection.host}, database: ${mongoose.connection.name}`);
            break;
        } catch (error) {
            console.error(`[MongoDB] Connection failed: ${error.message}`);
            retries -= 1;
            console.log(`[MongoDB] Retries left: ${retries}`);
            if (retries === 0) {
                console.error("[MongoDB] Exiting process due to DB connection failure");
                process.exit(1);
            }
            // wait 2 seconds before retrying
            await new Promise(res => setTimeout(res, 2000));
        }
    }
};

// Graceful shutdown
process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        console.log('[MongoDB] Connection closed due to application termination');
        process.exit(0);
    } catch (err) {
        console.error('[MongoDB] Error during connection closure', err);
        process.exit(1);
    }
});

export default connectDB;
