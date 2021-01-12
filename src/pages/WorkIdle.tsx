import {
  IonAvatar,
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonSpinner,
} from "@ionic/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { firebaseApp } from "../apps/FirebaseApp";
import ClockContainer from "../components/ClockContainer";
import WorkHeader from "../components/WorkHeader";

import "./WorkIdle.css";

interface Teammate {
  approved: boolean;
  email: string;
  name: string;
  photo: string;
  uid: string;
}

const WorkIdle: React.FC = () => {
  const [teams, setTeams] = useState<Teammate[] | null>(null);
  useEffect(() => {
    (async () => {
      const token = await firebaseApp
        .auth()
        .currentUser?.getIdToken(/* forceRefresh */ true);

      const data = await axios.get("/teammate", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTeams(data.data);
    })();
  }, []);
  return (
    <IonPage>
      <WorkHeader CenterModule={ClockContainer} />
      <IonContent fullscreen>
        <div className="work_container">
          <div id="work_button">
            <div>
              <IonButton id="gotowork" size="large" expand="block">
                출근
              </IonButton>
              <p>누적: 5h</p>
            </div>
          </div>
          <div id="work_teams">
            <IonList>
              <IonListHeader>
                <h2>팀원</h2>
              </IonListHeader>
              {teams !== null ? (
                teams.map((teammate) => (
                  <IonItem key={teammate.uid}>
                    <IonAvatar slot="start">
                      <img src={teammate.photo} alt="" />
                    </IonAvatar>
                    <IonLabel>
                      <h3>{teammate.name}</h3>
                      <p>3.5h</p>
                    </IonLabel>
                  </IonItem>
                ))
              ) : (
                <IonSpinner />
              )}
            </IonList>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default WorkIdle;
