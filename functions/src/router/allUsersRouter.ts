import * as express from "express";
import * as admin from "firebase-admin";

export const allUsersRouter = express.Router();

allUsersRouter.get("/", async (req, res) => {
  const { uid } = req.decodedToken;

  try {
    // Check if user is approved
    const userDatas = (
      await admin.firestore().collection("/users").get()
    ).docs.reduce<any>(
      (prev, curr) => ({ ...prev, [curr.id]: curr.data() }),
      {}
    );
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
});
