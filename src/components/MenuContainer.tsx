import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import "./ExploreContainer.css";

interface ContainerProps {}

const MenuContainer: React.FC<ContainerProps> = () => {
  return (
    <IonMenu side="start" contentId="main">
      <IonHeader>
        <IonToolbar>
          <IonTitle>메뉴</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonIcon name="mail" slot="start" />
            <IonLabel>Inbox</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default MenuContainer;
