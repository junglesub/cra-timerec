import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import ClockContainer from "../components/ClockContainer";

import "./Work.css";

const Work: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>
            <h1 id="clock">
              <ClockContainer />
            </h1>
          </IonTitle>
          <IonAvatar id="myavatar">
            <img src="https://ionicframework.com/docs/demos/api/list/avatar-finn.png" />
          </IonAvatar>
        </IonToolbar>
      </IonHeader>
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
              <IonItem>
                <IonAvatar slot="start">
                  <img src="https://ionicframework.com/docs/demos/api/list/avatar-finn.png" />
                </IonAvatar>
                <IonLabel>
                  <h3>김한동</h3>
                  <p>3.5h</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonAvatar slot="start">
                  <img src="https://ionicframework.com/docs/demos/api/list/avatar-luke.png" />
                </IonAvatar>
                <IonLabel>
                  <h3>이컴순</h3>
                  <p>3.5h</p>
                </IonLabel>
              </IonItem>
            </IonList>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Work;
