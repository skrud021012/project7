// components/RankingModal.js
import React, { useEffect, useState } from "react";
import { getLocalRankings } from "../utils/localRank";
import "./RankingModal.css";

export default function RankingModal({ onClose }) {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const data = getLocalRankings();
    const sorted = [...data].sort((a, b) => b.score - a.score).slice(0, 10);
    setRanking(sorted);
  }, []);

  return (
    <div className="ranking-modal-overlay">
      <div className="ranking-modal">
        <h2>🏆 랭킹 <span className="highlight">TOP 10</span></h2>
        <ol className="ranking-list">
          {ranking.map((r, i) => (
            <li key={i}>
              <span className="rank-num">{i + 1}.</span>
              <span className="rank-name">{r.nickname}</span>
              <span className="rank-score">{r.score}점</span>
            </li>
          ))}
        </ol>
        <button className="close-btn" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}
