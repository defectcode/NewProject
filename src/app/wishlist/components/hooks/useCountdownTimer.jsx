import { useState, useEffect } from "react";

const useCountdownTimer = () => {
  const targetDate = new Date("2025-03-17T00:00:00Z").getTime();
  const [timeLeft, setTimeLeft] = useState(Math.floor((targetDate - Date.now()) / 1000));

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(Math.floor((targetDate - Date.now()) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, targetDate]);

  const formatTime = () => {
    if (timeLeft >= 24 * 60 * 60) {
      return `${Math.floor(timeLeft / (24 * 60 * 60))} days left`;
    } else if (timeLeft >= 60 * 60) {
      return `${Math.floor(timeLeft / (60 * 60))} hours left`;
    } else {
      return `${Math.floor(timeLeft / 60)} minutes left`;
    }
  };

  return (
    <div className="">
      {formatTime()}
    </div>
  );
};

export default useCountdownTimer;
