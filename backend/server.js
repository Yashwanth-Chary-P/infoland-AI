import app from './src/app.js';
import connectDB from './src/config/database.js';
import logger from './src/utils/logger.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB().then(() => {
  // Start Server
  app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
    logger.info(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  });
}).catch(err => {
  logger.error('Failed to start server due to database connection error', err);
  process.exit(1);
});
