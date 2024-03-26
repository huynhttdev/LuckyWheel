// Init
const mainTag = isAndroid() ? document : document;
mainTag.addEventListener("message", (message) => {
  const data = JSON.parse(message.data);
  if (data.wheelId) {
    initData(data);
  } else if (data.share_facebook_success) {
    handleShareSuccess();
  }
});

const onDocumentLoad = () => {
  if (checkRedirectUrl()) return;
  // if (!isWebview(navigator.userAgent)) {
  //   return showNotSupportModal();
  // }
  loading.style.display = "block";
  getWheelDetailsAPI();
};

// Header
btnBack.addEventListener("click", () => {
  window.ReactNativeWebView.postMessage("BACK");
});

// Footer
btnGuide.addEventListener("click", () => {
  window.ReactNativeWebView.postMessage("GAME_GUIDE");
});
btnGift.addEventListener("click", () => {
  window.ReactNativeWebView.postMessage("MY_GIFTS");
});

// Modal
iconClose.addEventListener("click", hideModal);
btnContinueSpin.addEventListener("click", hideModal);
btnUnderstand.addEventListener("click", hideModal);
btnViewGift.addEventListener("click", () => {
  window.ReactNativeWebView.postMessage("MY_GIFTS");
});
btnLoadingError.addEventListener("click", () => {
  window.ReactNativeWebView.postMessage(btnLoadingError.dataset.errorCode);
});

// Wheel
btnShare.addEventListener("click", () => {
  window.ReactNativeWebView.postMessage("SHARE");
});

btnSpin.addEventListener("click", () => {
  // Check turns
  if (getTurns() <= 0) {
    return showNoMoreTurnsModal();
  }

  // Check start date
  const currDate = new Date();
  const startDate = new Date(getStartDate());
  if (currDate.getTime() < startDate.getTime()) {
    return showCommonErrorModal(
      `Game vòng quay may mắn sẽ bắt đầu từ ${startDate.getHours()}h${startDate.getMinutes()}' ngày ${startDate.getDate()}-${
        startDate.getMonth() + 1
      }-${startDate.getFullYear()}`
    );
  }

  // Spin
  if (isWheelStopped) {
    isWheelStopped = false;
    getSpinResultAPI()
      .then((res) => {
        const selectedGift = gifts.find(({ id }) => res.id === id);
        const surplus = totalDegree % 360;
        const spinDegree = (selectedGift.degree - surplus + 360) % 360;
        totalDegree += randomInRange(spinDegree - 40, spinDegree - 5) + 2880;
        wheel.style.transform = `rotate(${totalDegree}deg)`;

        setTimeout(() => {
          isWheelStopped = true;
          if (selectedGift.type === "voucher") {
            showSuccessModal(selectedGift);
          } else if (selectedGift.type === "bonus_turns") {
            showMoreTurnModal(selectedGift);
          } else {
            showLuckyModal(selectedGift);
          }
        }, 8000);
      })
      .catch(() => {
        isWheelStopped = true;
      });
  }
});
