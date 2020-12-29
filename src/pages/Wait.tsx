import { IonContent, IonPage } from "@ionic/react";
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
            <a href="#">로그아웃</a>
            <a href="#">회원탈퇴</a>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Wait;
