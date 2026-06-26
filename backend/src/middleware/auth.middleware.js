import admin from '../config/firebase.js';
import { errorResponse } from '../utils/apiResponse.js';
import logger from '../utils/logger.js';

/**
 * Middleware to verify Firebase ID token
 */
export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json(errorResponse('Unauthorized: No token provided'));
  }

  const token = authHeader.split(' ')[1];

  try {
    // If not in a production environment and testing is needed, we could bypass this,
    // but the rules state "Do not use mock authentication". 
    // It will throw if the token is invalid or if firebase is not configured properly.
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    logger.error('Firebase token verification error', error);
    return res.status(401).json(errorResponse('Unauthorized: Invalid token'));
  }
};

/**
 * Middleware to ensure route is protected (user must be authenticated)
 */
export const requireAuth = [
  verifyToken,
  (req, res, next) => {
    if (!req.user) {
      return res.status(401).json(errorResponse('Unauthorized: Authentication required'));
    }
    next();
  }
];

/**
 * Middleware to inject current user into request without failing if unauthenticated
 */
export const currentUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;
    } catch (error) {
      // Don't fail the request, just leave req.user undefined
      logger.warn('Invalid token provided for optional auth route', error.message);
    }
  }
  
  next();
};
