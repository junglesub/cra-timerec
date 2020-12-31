import React from "react";
import { Redirect } from "react-router";
import { firebaseApp } from "../FirebaseApp";

export const Logout: React.FC = () => {
  firebaseApp.auth().signOut();
  return <Redirect to="/" />;
};
