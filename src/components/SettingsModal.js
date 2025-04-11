// src/components/SettingsModal.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetGame } from "../redux/gameSlice";
import { useNavigate } from "react-router-dom";
import "./SettingsModal.css";


export default function SettingsModal({ onClose, onGoHome }) {
  const nickname = useSelector((state) => state.user.nickname);
  const [showHowTo, setShowHowTo] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleGoHome = () => {
    dispatch(resetGame());   // 🔥 여기서 상태 초기화!
    onGoHome();  // 또는 props.goHome(), window.location      
  };

  if (showHowTo) {
    return (
      <div className="settings-overlay">
        <div className="settings-modal">
          <h2 className="settings-title">📖 게임 방법</h2>
          <ul className="howto-list">
            <li>같은 숫자 또는 합이 10인 숫자를 연결하세요.</li>
            <li>같은 행, 열, 대각선만 연결 가능 (사이에 숫자 없어야 함)</li>
            <li>💡 힌트를 사용하면 자동으로 연결할 수 있어요.</li>
            <li>➕ 복사 버튼으로 줄을 추가할 수 있어요.</li>
          </ul>
          <button className="close-btn" onClick={() => setShowHowTo(false)}>뒤로가기</button>
        </div>
      </div>
    );
  }

  return (
    <div className="settings-overlay">
      <div className="settings-modal">
        <h2 className="settings-title">⚙️ 설정</h2>
        <div className="nickname-section">
          <span className="nickname-label">👤 닉네임:</span>
          <span className="nickname-value">{nickname}</span>
        </div>
        <div className="settings-buttons">
          <button onClick={() => setShowHowTo(true)}>게임 방법</button>
          <button onClick={onClose}>🔙</button>
          <button onClick={handleGoHome}>🏠</button> {/* onGoHome */}
        </div>
      </div>
    </div>
  );
}
