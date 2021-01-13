import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import fetch from "node-fetch";
import { config } from "../config";

export const slackAuthRouter = express.Router();

const redirect_uri = `${config.server}/slackauth/cb`;
slackAuthRouter.get("/", (req, res) => {
  return res.redirect(
    `https://cra2020-2.slack.com/oauth?client_id=1340043331121.1617655917201&scope=identity.basic,identity.avatar,identity.email&redirect_uri=${redirect_uri}`
  );
});

slackAuthRouter.get("/cb", async (req, res) => {
  const app_uri = `${config.client}/login`;

  const { code } = req.query;
  fetch("https://slack.com/api/oauth.access", {
    method: "post",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: "1340043331121.1617655917201",
      client_secret: functions.config().slack.client_secret,
      redirect_uri: redirect_uri,
      code: `${code}`,
    }).toString(),
  })
    .then((doc) => doc.json())
    .then((json) => {
      if (!json.ok) return res.status(500).json(json);
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
          console.log("Creating New User - " + uid);
          const createUserPromise = admin
            .auth()
            .createUser({
              uid: uid,
              ...userParams,
            })
            .then();
          const createDbUserPromise = admin
            .firestore()
            .collection("/users")
            .doc(uid)
            .create({
              approved: true,
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
