import * as functions from "firebase-functions";
import * as express from "express";
import slackAuthRouter from "./router/slackAuthRouter";

const app = express();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

app.use("/slackauth", slackAuthRouter);

app.use("/", (req, res) => {
  res.send("Hello World!!");
});

exports.app = functions.region("asia-northeast3").https.onRequest(app);

// export const loginSlack = functions
//   .region("asia-northeast3")
//   .https.onRequest((req, res) => {
//     // Signin with Slack
//     res.send("Hello World");
//   });
