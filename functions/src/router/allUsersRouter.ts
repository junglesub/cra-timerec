import * as express from "express";
import * as admin from "firebase-admin";

export const allUsersRouter = express.Router();

allUsersRouter.get("/", (req, res) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) return res.sendStatus(401);
  return admin
    .auth()
    .verifyIdToken(token)
    .then(async (decodedToken) => {
      // Get user data
      const { uid } = decodedToken;

      try {
        // Check if user is approved
        const userDatas = (await admin.database().ref("users").get()).val();
        if (!userDatas[uid].approved) return res.sendStatus(403);

        const users = await admin.auth().listUsers();
        return res.json(
          users.users.map((user) => ({
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            approved: userDatas[user.uid]?.approved,
          }))
        );
      } catch (error) {
        return res.status(500).json(error);
      }
    })
    .catch((err) => res.status(401).json(err));
});
