import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import { slackAuthRouter } from "./router/slackAuthRouter";
import { allUsersRouter } from "./router/allUsersRouter";

const app = express();
admin.initializeApp({
  databaseURL: "https://cra-timerec-1229-default-rtdb.firebaseio.com/",
});

// Used to Login with Slack
app.use("/slackauth", slackAuthRouter);

// Get all Users Teammate
app.use("/teammate", allUsersRouter);

app.use("/", (req, res) => {
  res.send("Hello World!!");
});

exports.app = functions.region("asia-northeast3").https.onRequest(app);

exports.deleteUserHandle = functions
  .region("asia-northeast3")
  .auth.user()
  .onDelete((user) => {
    // Remove from Database
    return admin.firestore().collection("/users").doc(user.uid).delete();
  });
