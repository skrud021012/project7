// src/pages/GamePage.js

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setBoard,            // 게임 보드 초기화
  decrementTime,       // 1초마다 시간 감소
  setGameOver,         // 게임 오버 상태 설정
  setHintPair,         // 힌트 쌍 설정
  addRow,              // 줄 추가
  pauseGame,           // 일시정지 토글
} from "../redux/gameSlice";
import { generateBoard, findHintPair } from "../utils/gameLogic";
import GameBoard from "../components/GameBoard";
import Controls from "../components/Controls";
import TimerBar from "../components/TimerBar";
import GameOverModal from "../components/GameOverModal";
import SettingsModal from "../components/SettingsModal";
import resumeIcon from '../assets/icons/resume.png';
import './GamePage.css';

export default function GamePage({ goHome }) {
  const dispatch = useDispatch();

  // Redux 상태 가져오기
  const board = useSelector((state) => state.game.board);
  const timeLeft = useSelector((state) => state.game.timeLeft);
  const gameOver = useSelector((state) => state.game.gameOver);
  const paused = useSelector((state) => state.game.paused);

  // 로컬 상태: 설정 모달 표시 여부
  const [showSettings, setShowSettings] = useState(false);

  // 게임 시작 시 보드 초기화
  useEffect(() => {
    const board = generateBoard(9, 9);
    dispatch(setBoard(board));
  }, [dispatch]);

  // 1초마다 타이머 감소 (일시정지나 게임오버가 아닐 때만)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused && !gameOver) {
        dispatch(decrementTime());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [paused, gameOver, dispatch]);

  // 시간이 0이 되면 게임 오버 처리
  useEffect(() => {
    if (timeLeft <= 0 && !gameOver) {
      dispatch(setGameOver());
    }
  }, [timeLeft, gameOver, dispatch]);

  return (
    <div className="game-page">
      {paused ? (
        // ⏸ 일시정지 상태일 때: 플레이 아이콘만 표시
        // src/assets/icons/resume.png 에서 불러온 이미지!
        <div className="pause-overlay" onClick={() => dispatch(pauseGame())}>
          <img src={resumeIcon} alt="resume" className="pause-icon" /> 
        </div>
      ) : (
        // ▶️ 게임 화면 표시
        <>
          <h1>Number Match</h1>
          <TimerBar />           {/* ⏱ 타이머 바 */}
          <GameBoard />         {/* 🎮 게임판 */}
          <Controls onShowSettings={() => setShowSettings(true)} />        
                                {/* 🧩 버튼들 (힌트, 복사, 랭킹 등) */}
          {gameOver && <GameOverModal />} {/* 💥 게임 오버 시 모달 */}

          {/* 설정 모달 */}
          {showSettings && (
            <SettingsModal
              onClose={() => setShowSettings(false)}
              onGoHome={() => {
                setShowSettings(false);
                goHome(); // 홈 화면으로 이동
              }}
            />
          )}
        </>
      )}
    </div>
  );
}