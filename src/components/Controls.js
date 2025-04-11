// components/Controls.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setHintPair,
  addRow,
  pauseGame,
  resetGame,
  performCopy,
  consumeHint,
  setGameOver,
  
} from "../redux/gameSlice";
import { findHintPair, checkAdjacentCells } from "../utils/gameLogic";
import RankingModal from "./RankingModal";
import "./Controls.css";

export default function Controls({ onShowSettings }) {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.game.board);
  const score = useSelector((state) => state.game.score);
  const hintsLeft = useSelector((state) => state.game.hintsLeft);
  const copyLeft = useSelector((state) => state.game.copyLeft);
  const [showRanking, setShowRanking] = useState(false);
  const paused = useSelector((state) => state.game.paused);

  // 게임 오버 체크 함수
  const checkForMatches = (board) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const currentValue = board[i][j];
        // 각 셀에 대해 연결 가능한 숫자가 있는지 확인
        if (checkAdjacentCells(i, j, currentValue, board)) {
          return true; // 연결 가능한 숫자 발견
        }
      }
    }
    return false; // 없으면 게임 오버
  };

  // 게임 오버 처리 함수
  const handleGameOver = () => {
    if (!checkForMatches(board)) {
      dispatch(setGameOver()); // 게임 오버 상태로 변경
    }
  };

  // 힌트 사용 함수 (useHint 액션을 dispatch로 변경)
  const handleHint = () => {
    const pair = findHintPair(board);
    if (pair && hintsLeft > 0) {
      dispatch(setHintPair(pair));
      dispatch(consumeHint()); // 힌트 사용 시 차감
    } else {
      alert("사용 가능한 힌트가 없어요! 😢");
    }
  };

  // 추가 숫자 사용 함수
  const handleAddRow = () => {
    if (copyLeft > 0) {
      dispatch(addRow()); // 행 추가
    } else {
      alert("복사할 수 있는 숫자가 없어요! 😢");
    }
  };

  return (
    <>
      <div className="controls">
        <div className="status">
          <span>점수: {score}</span>
        </div>

        <div className="icon-buttons">
          {/* 💡 힌트 */}
          <div className="icon-button" onClick={handleHint}>
            <span className="count-label">{hintsLeft}</span>
            <span role="img" aria-label="hint">💡</span>
          </div>

          {/* ➕ 복사 */}
          <div className="icon-button" onClick={handleAddRow}>
            <span className="count-label">{copyLeft}</span>
            <span role="img" aria-label="copy">➕</span>
          </div>

          {/* 🏅 랭킹 */}
          <div className="icon-button" onClick={() => setShowRanking(true)}>🏅</div>

          {/* ⏸ 일시정지 */}
          <div className="icon-button" onClick={() => dispatch(pauseGame())}>⏸</div>

          {/* 🔄 재시작 */}
          <div className="icon-button" onClick={() => dispatch(resetGame())}>🔄</div>

          {/* ⚙️ 설정 */}
          <div className="icon-button" onClick={onShowSettings}>⚙️</div>
        </div>
      </div>

      {showRanking && <RankingModal onClose={() => setShowRanking(false)} />}
    </>
  );
}
