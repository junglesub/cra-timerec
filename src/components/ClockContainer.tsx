import React, { useEffect, useState } from "react";
import "./ExploreContainer.css";

interface ContainerProps {}

const ClockContainer: React.FC<ContainerProps> = () => {
  const date = new Date();
  const [[hours, minutes], setTime] = useState([
    date.getHours(),
    date.getMinutes(),
  ]);
  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      setTime([date.getHours(), date.getMinutes()]);
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <>
      {hours < 10 ? "0" + hours : hours}:
      {minutes < 10 ? "0" + minutes : minutes}
    </>
  );
};

export default ClockContainer;
