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
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseApp } from "../FirebaseApp";

import "./WorkHeader.css";

interface ContainerProps {
  CenterModule?: React.FunctionComponent;
}

const WorkHeader: React.FC<ContainerProps> = ({ CenterModule }) => {
  const [user, loading] = useAuthState(firebaseApp.auth());
  return !loading ? (
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
                <img src={user.photoURL} alt="" />
              </IonAvatar>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonHeader>
  ) : null;
};

export default WorkHeader;
