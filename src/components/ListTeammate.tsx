import {
  IonAvatar,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonSpinner,
} from "@ionic/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { firebaseApp } from "../apps/FirebaseApp";

interface Teammate {
  approved: boolean;
  email: string;
  name: string;
  photo: string;
  uid: string;
}

interface TeamTime {
  duration: number;
  since: Date | null;
}

const toHHMMSS = (sec_num: number) => {
  const hours = Math.floor(sec_num / 3600);
  const minutes = Math.floor((sec_num - hours * 3600) / 60);
  const seconds = sec_num - hours * 3600 - minutes * 60;

  return `${hours}시간 ${minutes < 10 ? "0" : ""}${minutes}분 ${
    seconds < 10 ? "0" : ""
  }${seconds}초`;
};

function ListTeammate({ id = "" }) {
  const [date, setDate] = useState(new Date().getTime());
  const [teams, setTeams] = useState<Teammate[] | null>(null);
  const [userWorkTime, loading] = useCollection(
    firebaseApp.firestore().collection("user_worktime"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const calculateTime = (
    since: firebase.default.firestore.Timestamp,
    duration: number
  ) => {
    if (!since) {
      return duration;
    } else {
      return duration + Math.round((date - since.toDate().getTime()) / 1000);
    }
  };

  // 최적화는 나중에..
  const teamData = userWorkTime?.docs.reduce(
    (prev: { string: TeamTime }, curr: any) => {
      return {
        ...prev,
        [curr.id]: curr.data(),
      };
    },
    {}
  );

  console.log(teamData);

  useEffect(() => {
    (async () => {
      const token = await firebaseApp
        .auth()
        .currentUser?.getIdToken(/* forceRefresh */ true);

      const data = await axios.get("/teammate", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTeams(data.data);
    })();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date().getTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div id={id}>
      <IonList>
        <IonListHeader>
          <h2>팀원</h2>
        </IonListHeader>
        {!loading && teams !== null ? (
          teams.map((teammate) => (
            <IonItem key={teammate.uid}>
              <IonAvatar slot="start">
                <img src={teammate.photo} alt="" />
              </IonAvatar>
              <IonLabel>
                <h3>{teammate.name}</h3>
                <p>
                  {toHHMMSS(
                    calculateTime(
                      teamData[teammate.uid]?.since || 0,
                      teamData[teammate.uid]?.duration || 0
                    )
                  )}
                </p>
              </IonLabel>
            </IonItem>
          ))
        ) : (
          <IonSpinner />
        )}
      </IonList>
    </div>
  );
}

export default ListTeammate;
