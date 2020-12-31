import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import { slackAuthRouter } from "./router/slackAuthRouter";

const app = express();
admin.initializeApp({
  databaseURL: "https://cra-timerec-1229-default-rtdb.firebaseio.com/",
});

app.use("/slackauth", slackAuthRouter);

app.use("/", (req, res) => {
  res.send("Hello World!!");
});

exports.app = functions.region("asia-northeast3").https.onRequest(app);

exports.deleteUserHandle = functions
  .region("asia-northeast3")
  .auth.user()
  .onDelete((user) => {
    // Remove from Database
    return admin.database().ref("/users").child(user.uid).remove();
  });
