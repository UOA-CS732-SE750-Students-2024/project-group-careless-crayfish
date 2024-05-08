import React, { useEffect, useState, useRef } from "react";

const CountDownWapper = ({ expire, showDomStruct = true, onExpire }) => {
  const [timeView, setTimeView] = useState({ h: "00", m: "00", s: "00" });
  const countDownTimer = useRef();

  useEffect(() => {
    const countDown = () => {
      const nowTime = new Date().getTime();
      const expireTime = new Date(expire).getTime();
      const times = Math.floor((expireTime - nowTime) / 1000);
      if (expire == ""){
        return null;
      }
      if (times > 0) {
        const h = `${Math.floor((times / 3600) % 24)}`.padStart(2, "0");
        const m = `${Math.floor((times / 60) % 60)}`.padStart(2, "0");
        const s = `${times % 60}`.padStart(2, "0");
        setTimeView({ h, m, s });
        countDownTimer.current = setTimeout(countDown, 1000);
      } else {
        setTimeView({ h: "00", m: "00", s: "00" });
        clearTimeout(countDownTimer.current);
        if (onExpire) {
          onExpire(); // Call the callback when the timer expires
        }
      }
    };

    countDown();
    return () => clearTimeout(countDownTimer.current);
  }, [expire, onExpire]);

  if (!showDomStruct) return null;

  return (
    <>
      {timeView.h}:{timeView.m}:{timeView.s}
    </>
  );
};

export default CountDownWapper;
