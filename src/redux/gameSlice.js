// src/redux/gameslice.js
import { createSlice } from "@reduxjs/toolkit";
import { pullDownBoard, removeEmptyRows } from "../utils/gameLogic";


const initialState = {
  board: [],  // 숫자 배열
  selected: [], // 선택한 셀 위치들
  score: 0,
  paused: false,
  gameOver: false,
  hintsLeft: 6, // 힌트 개수
  copyLeft: 6, // 복사 가능 횟수
  timeLeft: 80, // ⏱ 남은 시간
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    consumeHint: (state) => {
        if (state.hintsLeft > 0) {
          // state.hintsLeft -= 1;
        }
    },
    performCopy: (state) => {
        if (state.copyLeft > 0) {
          state.copyLeft -= 1;
        }
    },
    
    setGameOver: (state) => {
        state.gameOver = true;
    },

    setBoard(state, action) {
      state.board = action.payload;
    
    },

    selectCell(state, action) {
      state.selected.push(action.payload); // [row, col]
    },

    clearSelected(state) {
      state.selected = [];
    },

    addScore(state, action) {
      state.score += action.payload; // 두 개 자동 선택
    },

    pauseGame(state) {
      state.paused = !state.paused;
    },

    resetGame(state) {
      const newBoard = []; // 기본값으로 초기화
      for (let i = 0; i < 9; i++) {
        const row = [];
        for (let j = 0; j < 9; j++) {
          row.push(Math.floor(Math.random() * 9) + 1);
        }
        newBoard.push(row);
      }

      state.board = newBoard;
      state.selected = [];
      state.score = 0;
      state.hintsLeft = 6;
      state.paused = false;
      state.gameOver = false;
      state.copyLeft = 6;
      state.timeLeft = 80; 
    },

    removeMatchedCells(state) {
        const [a, b] = state.selected;
        const [r1, c1] = a;
        const [r2, c2] = b;
      
        state.board[r1][c1] = 0;
        state.board[r2][c2] = 0;
        state.selected = [];
        state.score += 10;
      
        // ✅ 시간은 최대 80초까지만
        state.timeLeft = Math.min(state.timeLeft + 10, 80);
      
        // 👇 빈 줄 제거
        state.board = removeEmptyRows(state.board);
    },

    setHintPair(state, action) {
      state.selected = action.payload;
      if (state.hintsLeft > 0) state.hintsLeft--;
    },

    addRow(state) {
      if (state.copyLeft > 0) {
        const newRow = [];
        for (let i = 0; i < state.board[0].length; i++) {
            newRow.push(Math.floor(Math.random() * 9) + 1);
          }
          state.board.push(newRow);
          state.copyLeft--; // 복사 횟수 차감
        }
    },
    decrementTime(state) {
        if (state.timeLeft > 0) {
          state.timeLeft -= 1;
        }
    },

    addBonusTime(state, action) {
        state.timeLeft += action.payload; // 기본은 10초
    },    
    setPaused(state, action) {
      state.paused = action.payload; // true or false로 직접 설정
    }, 

  },
});


export const {
  setBoard, selectCell, clearSelected,
  addScore, consumeHint, pauseGame,
  setGameOver, resetGame,
  removeMatchedCells, setHintPair, addRow, 
  decrementTime, addBonusTime, performCopy, 
  setPaused, 
} = gameSlice.actions;

export default gameSlice.reducer;
