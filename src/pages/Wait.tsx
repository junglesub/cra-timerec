import { IonButton, IonContent, IonPage } from "@ionic/react";
import React from "react";
import "./Wait.css";

const Wait: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container">
          <h1>승인 대기중</h1>
          <p>관리자의 승인을 대기하고 있습니다</p>
          <div id="waitAction">
            <a href="/logout">로그아웃</a>
            <IonButton
              color="danger"
              disabled
              onClick={() => console.log("회원탈퇴")}
            >
              회원탈퇴
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Wait;
