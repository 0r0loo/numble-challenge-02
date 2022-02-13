import React, { useCallback, useEffect, useState } from 'react';

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

  return {
    remainingTime,
    resetTime,
  };
};

export default useTimer;
