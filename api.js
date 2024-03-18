const LIMIT_REQUEST_TIMES = 8;

const getWheelDetailsAPI = () => {
  let counter = 0;

  const timerGetWheelDetails = setInterval(() => {
    ++counter;
    const token = getToken();
    const wheelId = getWheelId();
    if (counter === LIMIT_REQUEST_TIMES || (token && wheelId)) {
      clearInterval(timerGetWheelDetails);
      if (token && wheelId) {
        axiosClient.get(`/spin-games/${wheelId}`).then((response) => {
          if (response.data.data?.spin_game?.end_date) {
            const endDate = new Date(response.data.data?.spin_game?.end_date);
            const currDate = new Date();
            if (endDate.getTime() < currDate.getTime()) {
              return showEndGame();
            }
          }
          if (response.data.data?.spin_game?.items?.length === 8) {
            return renderGame(response.data.data);
          }
          showError();
        });
      } else {
        showError();
      }
    }
  }, 500);
};

const getSpinResultAPI = () => {
  const wheelId = getWheelId();
  return axiosClient.get(`/spin-games/${wheelId}/play`).then((response) => {
    return response.data.data;
  });
};

const doMissionAPI = () => {
  return axiosClient.post(`/spin-games/${getWheelId()}/do-mission`, {
    mission: "share_facebook",
  });
};
