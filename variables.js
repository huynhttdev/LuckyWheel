const API_URL = "https://api-dev.forlife.one/khachhang-api/api/v1";

const token = document.getElementById("token");
const refreshToken = document.getElementById("refresh-token");
const wheelId = document.getElementById("wheelId");

// Loading
const loading = document.getElementById("loading");
const loadingImg = document.getElementById("loading-img");
const loadingError = document.getElementById("loading-error");
const btnLoadingError = document.getElementById("loading-error-button");

// Content
const playCount = document.getElementById("play-count");
const countShare = document.getElementById("count-share");
const gameTitle = document.getElementById("game-title");
const wheelWrapper = document.getElementById("wheel-wrapper");
const turns = document.getElementById("turns");
const missions = document.getElementById("missions");
const endGame = document.getElementById("end-game");

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
