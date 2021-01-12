import { IonButton, IonContent, IonPage } from "@ionic/react";
import React from "react";
import ClockContainer from "../components/ClockContainer";
import ListTeammate from "../components/ListTeammate";
import WorkHeader from "../components/WorkHeader";

import "./WorkIdle.css";

const WorkIdle: React.FC = () => {
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
          <ListTeammate id="work_teams" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default WorkIdle;
