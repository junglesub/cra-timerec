/* eslint-disable */
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonPage,
  IonRow,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import ClockContainer from "../components/ClockContainer";
import WorkHeader from "../components/WorkHeader";

// import "./WorkProgress.css";

const WorkIdle: React.FC = () => {
  return (
    <IonPage>
      <WorkHeader CenterModule={() => <>3.2h</>} />
      <IonContent fullscreen>Hello World</IonContent>
    </IonPage>
  );
};

export default WorkIdle;
