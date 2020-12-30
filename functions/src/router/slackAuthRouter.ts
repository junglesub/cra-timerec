import * as functions from "firebase-functions";
import * as express from "express";
import fetch from "node-fetch";

export const slackAuthRouter = express.Router();
export default slackAuthRouter;

slackAuthRouter.get("/", (req, res) => {
  const redirect_uri =
    "http://localhost:5001/cra-timerec-1229/asia-northeast3/app/slackauth/cb";
  return res.redirect(
    `https://cra2020-2.slack.com/oauth?client_id=1340043331121.1617655917201&scope=identity.basic,identity.avatar&redirect_uri=${redirect_uri}`
  );
});

slackAuthRouter.get("/cb", async (req, res) => {
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
    .then((res) => res.json())
    .then((json) => {
      res.json({ code, json });
    })
    .catch((err) => res.status(500).send(err));
});
