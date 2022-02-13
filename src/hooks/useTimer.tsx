import React, { useCallback, useEffect, useState } from "react";

const useTimer = ({ basicTime = 15, intervalSec = 1, decreasingTime = 1 }) => {
  const [remainingTime, setRemainingTime] = useState(basicTime);

  const getRemainingTime = useCallback(() => {
    if (remainingTime === 0) {
      return;
    }
    setRemainingTime((prev) => prev - decreasingTime);
  }, [remainingTime, decreasingTime]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getRemainingTime();
    }, intervalSec * 1000);
    return () => clearInterval(intervalId);
  }, [intervalSec, decreasingTime, getRemainingTime]);

  const resetTime = useCallback(() => {
    setRemainingTime(basicTime);
  }, [basicTime]);

  const decreaseTime = useCallback((decreseNumber) => {
    setRemainingTime((prev) =>
      prev - decreseNumber < 0 ? 0 : prev - decreseNumber
    );
  }, []);

  return {
    remainingTime,
    resetTime,
    decreaseTime,
  };
};

export default useTimer;
