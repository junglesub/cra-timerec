import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import { slackAuthRouter } from "./router/slackAuthRouter";
import { allUsersRouter } from "./router/allUsersRouter";
import { workTimeRouter } from "./router/workTimeRouter";
import { checkAuth } from "./middlewares/checkAuth";
import * as cors from "cors";
import { config } from "./config";

const app = express();

app.use(
  cors({
    origin: config.client,
  })
);

admin.initializeApp({
  databaseURL: "https://cra-timerec-1229-default-rtdb.firebaseio.com/",
});

// Used to Login with Slack
app.use("/slackauth", slackAuthRouter);

// Get all Users Teammate
app.use("/teammate", checkAuth, allUsersRouter);

// Work Time Management
app.use("/worktime", checkAuth, workTimeRouter);

app.use("/", (req, res) => {
  res.send("Hello World!!");
});

exports.app = functions.region("asia-northeast3").https.onRequest(app);

exports.deleteUserHandle = functions
  .region("asia-northeast3")
  .auth.user()
  .onDelete((user) => {
    // Remove from Database
    admin.firestore().collection("/user_worktime").doc(user.uid).delete();
    return admin.firestore().collection("/users").doc(user.uid).delete();
  });
