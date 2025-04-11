import React from "react";
import { useSelector } from "react-redux";
import "./TimerBar.css";

export default function TimerBar() {
  const timeLeft = useSelector((state) => state.game.timeLeft);
  const percentage = Math.max((timeLeft / 80) * 100, 0); // 0~100%

  return (
    <div className="timer-bar-container">
      <div className="timer-bar" style={{ width: `${percentage}%` }}></div>
    </div>
  );
}
