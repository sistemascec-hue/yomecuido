import { useState, useEffect } from "react";

export default function UseCountdown(initialSeconds = 60) {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const startTimer = () => {
    if (secondsLeft > 0) return; // Evitar reiniciar si ya está en cuenta regresiva

    setSecondsLeft(initialSeconds);
    setIsDisabled(true);

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return { secondsLeft, isDisabled, startTimer };
}
