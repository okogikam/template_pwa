//UI/display

import {
  TILE_STATUS,
  createBoard,
  marktile,
  revealtile,
  checkWin,
  cheskLose,
} from "./minesweeper.js";

const BOARD_SIZE = 15;
const NUMBER_OF_MINE = 15;

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINE);
const boardElement = document.querySelector(".stage");
const minesLeftText = document.querySelector("[data-mine-count]");
const minesAll = document.querySelector("[data-mine]");
const messageText = document.querySelector(".subtext");
const score = document.querySelector(".score");
const btnReset = document.querySelector(".btn-reset");
const btnStart = document.querySelector(".btn-start-game");
const btnStop = document.querySelector(".btn-stop");
const start = document.querySelector(".start-game");
const timeDisplay = document.querySelector("[data-time]");
const scoreTime = document.querySelector(".score-time");
let timeScore = 0;

board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element);
    tile.element.addEventListener("click", () => {
      revealtile(board, tile);
      checkGameEND();
    });
    tile.element.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      marktile(tile);
      listMineLeft();
    });
  });
});
btnReset.addEventListener("click", () => {
  location.reload();
});
btnStart.addEventListener("click", () => {
  start.classList.add("d-none");
  let times = time();
});
btnStop.addEventListener("click", (times) => {
  clearInterval(times);
});
boardElement.style.setProperty("--stage", BOARD_SIZE);
minesAll.textContent = NUMBER_OF_MINE;
minesLeftText.textContent = 0;

function listMineLeft() {
  const marktilecount = board.reduce((count, row) => {
    return (
      count + row.filter((tile) => tile.status === TILE_STATUS.MARKED).length
    );
  }, 0);

  minesLeftText.textContent = 0 + marktilecount;
}

function checkGameEND() {
  const win = checkWin(board);
  const lose = cheskLose(board);

  if (win || lose) {
    score.classList.remove("d-none");
    boardElement.addEventListener("click", stopProp, { capture: true });
    boardElement.addEventListener("contextmenu", stopProp, { capture: true });
  }

  if (win) {
    messageText.textContent = "You Win";
    scoreTime.textContent = timeScore;
  }
  if (lose) {
    messageText.textContent = "You Lose";
    scoreTime.textContent = 0;
    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.status === TILE_STATUS.MARKED) marktile(tile);
        if (tile.mine) revealtile(board, tile);
      });
    });
  }
}

function stopProp(e) {
  e.stopImmediatePropagation();
}

function time() {
  setInterval(() => {
    timeScore += 1;
    let timeNow = "";
    let second = 0;
    let menit = 0;
    let jam = 0;
    if (timeScore < 60) {
      second = timeScore;
      timeNow = second + "s";
    }
    if (timeScore >= 60 && timeScore < 3600) {
      second = timeScore % 60;
      menit = Math.floor(timeScore / 60);
      timeNow = menit + "m" + second + "s";
    }
    if (timeScore >= 3600) {
      second = timeScore % 60;
      menit = Math.floor((timeScore % 3600) / 60);
      jam = Math.floor(timeScore / 3600);
      timeNow = jam + "h" + menit + "m" + second + "s";
    }
    timeDisplay.innerText = timeNow;
    // console.log(timeNow);
  }, 1000);
}
//1. membuat papan permainan
//2. fungsi klik kanan
// a. menampilkan kotak
//3. fungsi klik kanan
// b. menandai kotak
//4. cek menang kalah
