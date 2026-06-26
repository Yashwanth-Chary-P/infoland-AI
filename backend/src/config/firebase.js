import admin from 'firebase-admin';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

dotenv.config();

try {
  // If FIREBASE_SERVICE_ACCOUNT is provided as a JSON string
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    logger.info('Firebase Admin initialized with service account object');
  } 
  // Else if path to service account json is provided
  else if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
    admin.initializeApp({
      credential: admin.credential.cert(process.env.FIREBASE_SERVICE_ACCOUNT_PATH)
    });
    logger.info('Firebase Admin initialized with service account path');
  }
  // Otherwise initialize without credentials (useful for default app engine / cloud run environments, or mock)
  else {
    admin.initializeApp();
    logger.info('Firebase Admin initialized with default credentials');
  }
} catch (error) {
  logger.error('Firebase Admin initialization error:', error);
}

export default admin;
