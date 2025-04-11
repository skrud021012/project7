// utils/gameLogic.js

export const checkForMatches = (board) => {
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
  
export const checkAdjacentCells = (i, j, value, board) => {
    const directions = [
      [-1, 0], // 위
      [1, 0],  // 아래
      [0, -1], // 왼쪽
      [0, 1],  // 오른쪽
    ];
  
    for (let [dx, dy] of directions) {
      const ni = i + dx;
      const nj = j + dy;
  
      // 보드 범위 내에서만 체크
      if (ni >= 0 && ni < board.length && nj >= 0 && nj < board[ni].length) {
        if (board[ni][nj] === value) {
          return true;
        }
      }
    }
    return false; // 연결할 수 없으면 false
};


export function canConnect(cellA, cellB, board) {
    const [r1, c1] = cellA;
    const [r2, c2] = cellB;
  
    const val1 = board[r1][c1];
    const val2 = board[r2][c2];
  
    if (!val1 || !val2) return false;
  
    const isSum10 = val1 + val2 === 10;
    const isSame = val1 === val2;
  
    if (!(isSum10 || isSame)) return false;
  
    // 같은 행
    if (r1 === r2) {
      const [min, max] = [Math.min(c1, c2), Math.max(c1, c2)];
      for (let i = min + 1; i < max; i++) {
        if (board[r1][i]) return false;
      }
      return true;
    }
  
    // 같은 열
    if (c1 === c2) {
      const [min, max] = [Math.min(r1, r2), Math.max(r1, r2)];
      for (let i = min + 1; i < max; i++) {
        if (board[i][c1]) return false;
      }
      return true;
    }
  
    // 대각선
    if (Math.abs(r1 - r2) === Math.abs(c1 - c2)) {
      const dr = r1 < r2 ? 1 : -1;
      const dc = c1 < c2 ? 1 : -1;
      let i = r1 + dr, j = c1 + dc;
      while (i !== r2 && j !== c2) {
        if (board[i][j]) return false;
        i += dr;
        j += dc;
      }
      return true;
    }
  
    return false;
  }
  
  
  export function generateBoard(rows = 9, cols = 9) {
    const board = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push(Math.floor(Math.random() * 9) + 1); // 1 ~ 9
      }
      board.push(row);
    }
    return board;
  }

  export function findHintPair(board) {
    const rows = board.length;
    const cols = board[0].length;
  
    for (let r1 = 0; r1 < rows; r1++) {
      for (let c1 = 0; c1 < cols; c1++) {
        const val1 = board[r1][c1];
        if (val1 === 0) continue;
  
        for (let r2 = r1; r2 < rows; r2++) {
          for (let c2 = 0; c2 < cols; c2++) {
            if (r1 === r2 && c2 <= c1) continue; // 중복 방지
            const val2 = board[r2][c2];
            if (val2 === 0) continue;
  
            if (val1 + val2 === 10) {
              if (canConnect([r1, c1], [r2, c2], board)) {
                return [[r1, c1], [r2, c2]];
              }
            }
          }
        }
      }
    }
    return null;
  }

  export function removeEmptyRows(board) {
    return board.filter(row => !row.every(cell => cell === 0));
  }

  