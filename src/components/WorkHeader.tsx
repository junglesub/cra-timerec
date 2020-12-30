import {
  IonAvatar,
  IonButtons,
  IonCol,
  IonGrid,
  IonHeader,
  IonMenuButton,
  IonRow,
  IonToolbar,
} from "@ionic/react";
import React from "react";

import "./WorkHeader.css";

interface ContainerProps {
  CenterModule?: React.FunctionComponent;
}

const WorkHeader: React.FC<ContainerProps> = ({ CenterModule }) => {
  console.log("Hello");
  console.log(typeof CenterModule);
  return (
    <IonHeader>
      <IonToolbar>
        <IonGrid>
          <IonRow className="ion-align-items-center">
            <IonCol>
              <IonButtons>
                <IonMenuButton id="menuButton" />
              </IonButtons>
            </IonCol>
            <IonCol>
              <h1 id="clock">{!!CenterModule && <CenterModule />}</h1>
            </IonCol>
            <IonCol className="ion-align-self-end">
              <IonAvatar id="myavatar">
                <img
                  src="https://ionicframework.com/docs/demos/api/list/avatar-finn.png"
                  alt=""
                />
              </IonAvatar>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonHeader>
  );
};

export default WorkHeader;
