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

function ListTeammate({ id = "" }) {
  const [teams, setTeams] = useState<Teammate[] | null>(null);
  const [userWorkTime, loading] = useCollection(
    firebaseApp.firestore().collection("user_worktime"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

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
                <p>{teamData[teammate.uid].duration}</p>
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
