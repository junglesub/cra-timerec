declare namespace Express {
  export interface Request {
    decodedToken: import("firebase-admin").auth.DecodedIdToken;
  }
}
