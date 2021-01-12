import { IonButton, IonContent, IonPage } from "@ionic/react";
import axios from "axios";
import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { firebaseApp } from "../apps/FirebaseApp";
import ClockContainer from "../components/ClockContainer";
import ListTeammate from "../components/ListTeammate";
import WorkHeader from "../components/WorkHeader";

import "./WorkIdle.css";

const WorkIdle: React.FC = () => {
  const [userWorkDoc, loading] = useDocument(
    firebaseApp
      .firestore()
      .collection("user_worktime")
      .doc(firebaseApp.auth().currentUser?.uid),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  if (loading) return <div>Loading</div>;
  console.log(userWorkDoc.data());
  return (
    <IonPage>
      <WorkHeader CenterModule={ClockContainer} />
      <IonContent fullscreen>
        <div className="work_container">
          <div id="work_button">
            <div>
              {!userWorkDoc.data().since ? (
                <IonButton
                  id="gotowork"
                  size="large"
                  expand="block"
                  onClick={async () => {
                    const token = await firebaseApp
                      .auth()
                      .currentUser?.getIdToken(/* forceRefresh */ true);

                    await axios.get("/worktime/start", {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    });
                  }}
                >
                  출근
                </IonButton>
              ) : (
                <IonButton
                  id="gotowork"
                  size="large"
                  expand="block"
                  color="danger"
                  onClick={async () => {
                    const token = await firebaseApp
                      .auth()
                      .currentUser?.getIdToken(/* forceRefresh */ true);

                    await axios.get("/worktime/stop", {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    });
                  }}
                >
                  퇴근
                </IonButton>
              )}
              {/* <p>누적: 5h</p> */}
            </div>
          </div>
          <ListTeammate id="work_teams" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default WorkIdle;
