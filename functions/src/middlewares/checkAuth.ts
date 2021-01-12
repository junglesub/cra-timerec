import * as admin from "firebase-admin";
import * as express from "express";

// Middleware to check auth
export const checkAuth: express.RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) return res.sendStatus(401);

  return admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      req.decodedToken = decodedToken;
      return next();
    })
    .catch(() => res.sendStatus(401));
};
