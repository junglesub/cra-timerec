import * as express from "express";
import * as admin from "firebase-admin";

export const workTimeRouter = express.Router();

// /start - Start Working
workTimeRouter.get("/start", async (req, res) => {
  const data = (
    await admin
      .firestore()
      .collection("user_worktime")
      .doc(req.decodedToken.uid)
      .get()
  ).data();
  if (!data || !data.since) {
    admin
      .firestore()
      .collection("user_worktime")
      .doc(req.decodedToken.uid)
      .update({
        since: new Date(),
        // since: admin.firestore.Timestamp.now(),
      }) as any;
    return res.sendStatus(200);
  }
  return res.sendStatus(422);
});

// /stop - Stop/Finish Working
workTimeRouter.get("/stop", async (req, res) => {
  const data = (
    await admin
      .firestore()
      .collection("user_worktime")
      .doc(req.decodedToken.uid)
      .get()
  ).data();
  if (data?.since) {
    console.log("Date Since", data.since);
    const currDur = Math.round(
      (new Date().getTime() - data.since.toDate().getTime()) / 1000
    );
    console.log("currDur == ", currDur);
    admin
      .firestore()
      .collection("user_worktime")
      .doc(req.decodedToken.uid)
      .update({
        since: null,
        duration: !isNaN(data.duration) ? data.duration + currDur : currDur,
      }) as any;
    return res.json({
      currDur,
    });
  }
  return res.sendStatus(422);
});
