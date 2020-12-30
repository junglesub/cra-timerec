import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import fetch from "node-fetch";

export const slackAuthRouter = express.Router();
export default slackAuthRouter;

slackAuthRouter.get("/", (req, res) => {
  const redirect_uri =
    "http://localhost:5001/cra-timerec-1229/asia-northeast3/app/slackauth/cb";
  return res.redirect(
    `https://cra2020-2.slack.com/oauth?client_id=1340043331121.1617655917201&scope=identity.basic,identity.avatar,identity.email&redirect_uri=${redirect_uri}`
  );
});

slackAuthRouter.get("/cb", async (req, res) => {
  const app_uri = "http://localhost:8100/login";

  const { code } = req.query;
  fetch("https://slack.com/api/oauth.access", {
    method: "post",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: "1340043331121.1617655917201",
      client_secret: functions.config().slack.client_secret,
      code: `${code}`,
    }).toString(),
  })
    .then((doc) => doc.json())
    .then((json) => {
      if (!json.ok) return res.sendStatus(500);
      const { name, id, email, image_192 } = json.user;
      const userParams = {
        email: email,
        emailVerified: true,
        displayName: name,
        photoURL: image_192,
      };

      const uid = `slack_${id}`;

      admin
        .auth()
        .getUser(uid)
        .then(() => {
          // Update User
          return admin.auth().updateUser(uid, userParams);
        })
        .catch(() => {
          // Create User
          const createUserPromise = admin
            .auth()
            .createUser({
              uid: uid,
              ...userParams,
            })
            .then();
          const createDbUserPromise = admin
            .database()
            .ref("/users")
            .set({
              [uid]: {
                approved: false,
              },
            });
          return Promise.all([createUserPromise, createDbUserPromise]);
        })
        .finally(() => {
          admin
            .auth()
            .createCustomToken(uid)
            .then((customToken) => {
              // Configure User

              return res.redirect(app_uri + `?token=${customToken}`);
            })
            .catch((e) => res.send("Error While Creating Token.\n" + e));
        });
      return;
    })
    .catch((err) => res.status(500).send(err));
});
