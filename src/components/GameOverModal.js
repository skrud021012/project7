/*  components/ GameOverModal.js */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetGame } from "../redux/gameSlice";
import { saveScoreToLocal } from "../utils/localRank";
import "./GameOverModal.css";

export default function GameOverModal() {
  const dispatch = useDispatch();
  const score = useSelector((state) => state.game.score);
  const nickname = useSelector((state) => state.user.nickname);

  const handleSubmit = () => {
    if (!nickname || nickname.trim().length < 2) {
      return alert("닉네임이 없습니다. 처음 화면으로 돌아가주세요.");
    }
    saveScoreToLocal(nickname, score);
    dispatch(resetGame());
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>🎮 게임 종료!</h2>
        <p>플레이어: <strong>{nickname}</strong></p>
        <p>점수: {score}점</p>
        <button onClick={handleSubmit}>다시 시작</button>
      </div>
    </div>
  );
}
