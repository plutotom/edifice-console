"use client";
import { useEffect, useState } from "react";

export default function Time() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const dateObject = new Date();

      const hour = dateObject.getHours();
      const minute = dateObject.getMinutes();
      const second = dateObject.getSeconds();

      const currentTime = hour + " : " + minute + " : " + second;
      console.log("Hello");
      setTime(currentTime);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <div>{time}</div>;
}
