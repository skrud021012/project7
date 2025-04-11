// src/pages/StartPage.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setNickname } from "../redux/userSlice";
import RankingModal from "../components/RankingModal"; // 꼭 import 필요!
import "./StartPage.css";

export default function StartPage({ onStart }) {
  const [showRanking, setShowRanking] = useState(false);
  const [nickname, setLocalNickname] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const dispatch = useDispatch();

  const handleStart = () => {
    if (nickname.trim() === "") return alert("닉네임을 입력해주세요!");
    dispatch(setNickname(nickname));
    onStart(); // App.js에서 게임페이지로 전환
  };

  return (
    <div className="start-page">
      <h1>🎯 Number Match Game</h1>

      {/* 닉네임 입력 */}
      <input
        type="text"
        placeholder="닉네임 입력"
        value={nickname}
        onChange={(e) => setLocalNickname(e.target.value)}
        maxLength={20}
      />

      {/* 시작 / 랭킹 버튼 */}
      <div className="start-buttons">
        <button onClick={handleStart}>▶️</button>
        <button onClick={() => setShowRanking(true)}>🏅</button>
        <button onClick={() => setShowHelp(!showHelp)}>❓</button>
      </div>

      {/* 게임 방법 설명 */}
      {showHelp && (
        <div className="how-to-play">
          <h3>게임 방법 🎮</h3>
          <ul>
            <li>같은 행/열/대각선에 있는 숫자 두 개의 합이 10일 경우 클릭하여 제거!</li>
            <li>💡 힌트를 통해 자동 연결 가능</li>
            <li>➕ 버튼으로 줄 추가</li>
            <li>연결할 수 있는 쌍이 없으면 게임 종료</li>
          </ul>
        </div>
      )}

      {/* 🏅 랭킹 모달 */}
      {showRanking && (
        <RankingModal onClose={() => setShowRanking(false)} />
      )}
    </div>
  );
}
