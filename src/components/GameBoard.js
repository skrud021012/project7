// components/GameBoard.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCell,
  clearSelected,
  removeMatchedCells,
} from "../redux/gameSlice";
import { canConnect } from "../utils/gameLogic";
import "./GameBoard.css";

export default function GameBoard() {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.game.board);
  const selected = useSelector((state) => state.game.selected);

  const handleClick = (rowIdx, colIdx) => {
    if (board[rowIdx][colIdx] === 0) return;
  
    // 힌트 선택 상태일 수 있으므로 먼저 비워주자
    if (selected.length === 2) {
      dispatch(clearSelected());
      return; // 다음 클릭에 다시 정상 선택되도록
    }
  
    dispatch(selectCell([rowIdx, colIdx]));
  
    if (selected.length === 1) {
      const cellA = selected[0];
      const cellB = [rowIdx, colIdx];
  
      const can = canConnect(cellA, cellB, board);
      if (can) {
        dispatch(removeMatchedCells());
      } else {
        setTimeout(() => dispatch(clearSelected()), 500);
      }
    }
  };

  return (
    <div className="game-board">
      {board.map((row, rowIdx) => (
        <div className="row" key={rowIdx}>
          {row.map((cell, colIdx) => {
            const isSelected = selected.some(
              ([r, c]) => r === rowIdx && c === colIdx
            );
            return (
              <div
                key={colIdx}
                className={`cell ${isSelected ? "selected" : ""}`}
                onClick={() => handleClick(rowIdx, colIdx)}
              >
                {cell !== 0 ? cell : ""}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
