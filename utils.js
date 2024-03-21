// Token
const initData = (values) => {
  wheelId.value = values.wheelId;
  token.value = values.access_token;
  refreshToken.value = values.refresh_token;
  API_URL.value = `${values.customerUrl}api/v1`;
};
const getApiUrl = () => {
  return API_URL.value;
};
const setToken = (value) => {
  token.value = value;
};
const getToken = () => {
  return token.value;
};
const getRefreshToken = () => {
  return refreshToken.value;
};
const getWheelId = () => {
  return wheelId.value;
};

// Loading
const offLoadingError = () => {
  loading.style.display = "none";
  loadingImg.style.display = "none";
  loadingError.style.display = "none";
};

const showError = (errMsg = "Lỗi tải dữ liệu", errorCode = "ERROR") => {
  loading.style.display = "block";
  loadingImg.style.display = "none";
  loadingError.style.display = "flex";
  loadingError.children[0].innerText = errMsg;
  btnLoadingError.dataset.errorCode = errorCode;
};

const showLoading = () => {
  loading.style.display = "block";
  loadingImg.style.display = "block";
  loadingError.style.display = "none";
};

const offLoading = () => {
  loading.style.display = "none";
  loadingImg.style.display = "none";
  loadingError.style.display = "none";
};

// Wheel
const randomInRange = (start, end) => {
  const totalItems = end - start + 1;
  return Math.floor(Math.random() * totalItems + start);
};

const getGiftName = (gift) => {
  if (gift.type === "voucher") {
    return gift.name;
  }
  if (gift.type === "bonus_turns") {
    return `Thêm lượt`;
  }
  return "";
};

const renderWheel = (data) => {
  gifts = data;
  gifts.forEach((gift, index) => {
    gift.degree = ((360 * (gifts.length - index) + 180) / gifts.length) % 360;
  });
  sectionsSortedByDegree = JSON.parse(JSON.stringify(gifts)).sort(
    (preSection, nextSection) => preSection.degree - nextSection.degree
  );
  wheel.innerHTML = gifts
    .map((gift, index) => {
      let sectionHTML = `<span
      class="gift"
      style="
        --i:${index};
        --bgColor:${index % 2 ? "#ED1C24" : "#fff"};
        --color:${index % 2 ? "#fff" : "#333"};
        --number-of-gifts:${gifts.length}
      "
    >
      <div class="gift-content">
        <span class="gift-name">${getGiftName(gift)}</span>
        <img src="${gift.image.link}" alt="Gift" class="gift-image" />
      </div>
    </span>
    `;
      return sectionHTML;
    })
    .join("");
  loading.style.display = "none";
};

const renderPlayCount = (count) => {
  playCount.innerText = count;
};

const renderMission = (mission) => {
  if (mission) {
    const missionDate = new Date(mission.last_time_gain);
    const currentDate = new Date();
    if (currentDate.getDate() === missionDate.getDate()) {
      countShare.innerHTML = "1/1";
    } else {
      countShare.innerHTML = `0/${mission.bonus_turns}`;
    }
  } else {
    countShare.innerHTML = "0/1";
  }
};

const renderBackground = (imgLink) => {
  bgBody.src = imgLink;
};

const renderGame = (data) => {
  renderWheel(data.spin_game.items);
  renderPlayCount(data.remain_turn_count);
  renderMission(data.missions[0]);
  renderBackground(data.spin_game.background.link);
};

const changeTurns = (num) => {
  playCount.innerText = Number(playCount.innerText) + num;
};

const getTurns = () => {
  return Number(playCount.innerText);
};

// Modal
const showSuccessModal = (gift) => {
  modal.style.display = "block";
  imgSuccess.style.display = "inline-block";
  btnContinueSpin.style.display = "inline-block";
  imgSpin.style.display = "none";
  btnUnderstand.style.display = "none";
  textSuccess.innerHTML = gift.award_value;
  changeTurns(-1);
};

const showMoreTurnModal = (gift) => {
  modal.style.display = "block";
  imgSuccess.style.display = "none";
  btnContinueSpin.style.display = "inline-block";
  imgSpin.style.display = "inline-block";
  btnUnderstand.style.display = "none";
  textSuccess.innerHTML = `
    <div class="more-turns-title">Bạn đã nhận được</div>
    <div class="more-turns-content">THÊM LƯỢT QUAY</div>
  `;
  changeTurns(gift.bonus_turns);
};

const showLuckyModal = (gift) => {
  modal.style.display = "block";
  imgSuccess.style.display = "none";
  btnContinueSpin.style.display = "none";
  imgSpin.style.display = "inline-block";
  btnUnderstand.style.display = "inline-block";
  textSuccess.innerHTML = gift.name;
  changeTurns(-1);
};

const showNoMoreTurnsModal = () => {
  modal.style.display = "block";
  imgSuccess.style.display = "none";
  btnContinueSpin.style.display = "none";
  imgSpin.style.display = "inline-block";
  btnUnderstand.style.display = "inline-block";
  textSuccess.innerHTML = `
    <span style="font-size: 14px; font-weight:700; line-height:20px; color: #EA580C">
      Bạn đã hết lượt quay. Hãy trở lại vào ngày mai để chơi tiếp nhé!
    </span>
  `;
};

const showCommonErrorModal = (msg) => {
  modal.style.display = "block";
  imgSuccess.style.display = "none";
  btnContinueSpin.style.display = "none";
  imgSpin.style.display = "inline-block";
  btnUnderstand.style.display = "inline-block";
  textSuccess.innerHTML = `
    <span style="font-size: 14px; font-weight:700; line-height:20px; color: #EA580C">
     ${msg}
    </span>
  `;
};

const hideModal = () => {
  modal.style.display = "none";
};

const showNotSupportModal = () => {
  document.body.style.overflow = "hidden";
  document.body.style.pointerEvents = "none";
  preventModal.style.display = "flex";
};

// Common
const checkRedirectUrl = () => {
  const redirectUrl = window.location.href.split("?redirectUrl=")[1];
  const cleanRedirectUrl = decodeURIComponent(redirectUrl).split("&fbclid=")[0];
  if (redirectUrl) {
    window.location.replace(cleanRedirectUrl);
    return true;
  } else {
    return false;
  }
};

const isWebview = (ua) => {
  const rules = [
    // if it says it's a webview, let's go with that
    "WebView",
    // iOS webview will be the same as safari but missing "Safari"
    "(iPhone|iPod|iPad)(?!.*Safari)",
    // Android Lollipop and Above: webview will be the same as native but it will contain "wv"
    // Android KitKat to Lollipop webview will put Version/X.X Chrome/{version}.0.0.0
    "Android.*(;\\s+wv|Version/\\d.\\d\\s+Chrome/\\d+(\\.0){3})",
    // old chrome android webview agent
    "Linux; U; Android",
  ];
  const webviewRegExp = new RegExp("(" + rules.join("|") + ")", "ig");
  return !!ua.match(webviewRegExp);
};

const isAndroid = () => {
  const ua = navigator.userAgent.toLowerCase();
  return ua.indexOf("android") > -1;
};

const handleShareSuccess = () => {
  doMissionAPI()
    .then(() => {
      changeTurns(1);
      countShare.innerHTML = "1/1";
      window.ReactNativeWebView.postMessage("FACEBOOK_SHARE_SUCCESS");
    })
    .catch(() => {
      window.ReactNativeWebView.postMessage("FACEBOOK_SHARE_FAIL");
    });
};

const showEndGame = () => {
  endGame.style.display = "block";
  loading.style.display = "none";
  // Content
  gameTitle.style.display = "none";
  wheelWrapper.style.display = "none";
  turns.style.display = "none";
  missions.style.display = "none";
};
