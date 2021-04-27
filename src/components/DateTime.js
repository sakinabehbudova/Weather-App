import React, { useEffect, useState, useRef } from "react";

const DateTime = () => {
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  const date = new Date();
  let interval = useRef();
  const startTimer = () => {
    const countdownDate = new Date("May 30, 2021 00:00:00").getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        //stop timer
        clearInterval(interval.current);
      } else {
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };
  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  }, []);
  return (
    <div>
      <div className="date_time">
        <span> {`${date.toLocaleDateString()} - `}</span>
        <span>{timerHours}</span>
        <span>:{timerMinutes}</span>
        <span>:{timerSeconds}</span>
      </div>
    </div>
  );
};
export default DateTime;
