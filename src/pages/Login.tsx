import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import signinwithslack from "../assets/signinwithslack.png";
import "./Login.css";

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container">
          <h1>슬랙을 활용해 로그인</h1>
          <div>
            <img
              id="signinwithslack"
              src={signinwithslack}
              alt="Sign With Slack Button"
              onClick={() => console.log("Clicked")}
            />
            🤫 <u>개인정보 수집 및 이용</u>을 동의합니다.
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
