const API_URL = document.getElementById("apiUrl");

const token = document.getElementById("token");
const refreshToken = document.getElementById("refresh-token");
const wheelId = document.getElementById("wheelId");
const startDate = document.getElementById("start-date");

// Loading
const loading = document.getElementById("loading");
const loadingImg = document.getElementById("loading-img");
const loadingError = document.getElementById("loading-error");
const btnLoadingError = document.getElementById("loading-error-button");

// Content
const imageLoadedFlags = Array(9).fill(false);
const TIME_OUT_RENDER = 30; // 30s
const playCount = document.getElementById("play-count");
const countShare = document.getElementById("count-share");
const gameTitle = document.getElementById("game-title");
const wheelWrapper = document.getElementById("wheel-wrapper");
const turns = document.getElementById("turns");
const missions = document.getElementById("missions");
const endGame = document.getElementById("end-game");
const bgBody = document.getElementById("bg-body");

// Scripts.js file
const wheel = document.querySelector(".wheel");
const btnSpin = document.querySelector(".btn-spin");
const btnBack = document.getElementById("btn-back");
const btnGuide = document.getElementById("btn-guide");
const btnGift = document.getElementById("btn-gift");
const btnShare = document.getElementById("btn-share");

let isWheelStopped = true;
let totalDegree = 0;
let gifts = [];
let sectionsSortedByDegree = [];

// Gift modal
const iconClose = document.getElementById("close-icon");
const modal = document.getElementById("modal");
const imgSuccess = document.getElementById("img-success");
const imgSpin = document.getElementById("img-spin");
const textSuccess = document.getElementById("text-success");
const btnViewGift = document.getElementById("view-gift");
const btnContinueSpin = document.getElementById("continue-spin");
const btnUnderstand = document.getElementById("understand");

// Prevent modal
const preventModal = document.getElementById("modal-prevent");
