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

import "./Work.css";

const Work: React.FC = () => {
  return (
    <IonPage>
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
                <h1 id="clock">
                  <ClockContainer />
                </h1>
              </IonCol>
              <IonCol className="ion-align-self-end">
                <IonAvatar id="myavatar">
                  <img src="https://ionicframework.com/docs/demos/api/list/avatar-finn.png" />
                </IonAvatar>
              </IonCol>
            </IonRow>
          </IonGrid>
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
