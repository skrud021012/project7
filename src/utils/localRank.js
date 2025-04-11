// src/utils/localRank.js

export function saveScoreToLocal(nickname, score) {
    const data = JSON.parse(localStorage.getItem("rankings") || "[]");
    data.push({ nickname, score });
    data.sort((a, b) => b.score - a.score);
    localStorage.setItem("rankings", JSON.stringify(data.slice(0, 10)));
  }
  
  export function getLocalRankings() {
    return JSON.parse(localStorage.getItem("rankings") || "[]");
  }
  