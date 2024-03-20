let refreshTokenRequest = null;

const axiosClient = axios.create({});

const requestHandler = (config) => {
  const apiUrl = getApiUrl();
  const accessToken = getToken();
  config.baseURL = apiUrl;
  config.headers.set("Authorization", `Bearer ${accessToken}`);
  config.params = {
    ...config.params,
    version: Date.now(),
  };
  return config;
};

const responseErrorHandler = async (err) => {
  const originalRequest = err.config;

  if (err.response?.status === 401) {
    try {
      const refreshToken = getRefreshToken();
      refreshTokenRequest = refreshTokenRequest
        ? refreshTokenRequest
        : axios({
            method: "POST",
            baseURL: getApiUrl(),
            url: "/accounts/me/token/refresh",
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });
      const response = await refreshTokenRequest;
      const accessToken = response.data.data.access_token;
      if (accessToken) {
        setToken(accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosClient(originalRequest);
      }
    } catch (e) {
      offLoadingError();
      showError("Token hết hạn", "TOKEN_EXPIRED");
      return Promise.reject(e.response?.data ? e.response?.data : e);
    } finally {
      refreshTokenRequest = null;
    }
  }

  if (!err.config?.url?.includes("do-mission")) {
    showError(errorCodes[err.response.data.message]);
  }
  return Promise.reject(err);
};

axiosClient.interceptors.request.use(requestHandler, (err) =>
  Promise.reject(err)
);
axiosClient.interceptors.response.use(
  (response) => response,
  responseErrorHandler
);
