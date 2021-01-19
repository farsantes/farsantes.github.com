import axios, { AxiosResponse } from "axios";
import _window from "@/libraries/window";
import { apiUrl, timeout, stringify } from "@/assets/js/utils";

// AXIOS INSTANCE
const axiosInstance = axios.create();

export default axiosInstance;

axiosInstance.interceptors.request.use(async function (config) {

  if (!config.url) {
    console.warn("!config.url", config);
    return config;
  }

  // PROXY /api/
  if (0 != config.url.indexOf("http")) {
    console.log("axios intercept nuxt url", config.url, config.url.indexOf("/api/") >= 0);

    if (config.url.indexOf("/api/") >= 0) {
      const api = config.url.split("/api/")[1];
      const url = apiUrl() + "/api/" + api;
      config.url = url;
    }
  }

  return config;
});

// 'Authorization' RESPONSE UPDATE
axiosInstance.interceptors.response.use(function (response) {
  return response;
}, async function (axiosError?: { response: AxiosResponse, config: any, message: string } | string) {
  // ON AXIOS ERROR (NOT ASYNC + THROW):
  console.log("axiosError", axiosError);

  const response = "object" == typeof axiosError ? axiosError.response : null;
  const config = "object" == typeof axiosError ? axiosError.config : null;
  const message = "object" == typeof axiosError ? axiosError.message : "" || "";

  const configUrl = (config && config.url) ? config.url : "";
  const failSafe = configUrl.includes("failsafe");
  if (failSafe) return response;

  const data = response ? response.data : null;
  const statusText = response ? response.statusText : null;
  let msg = data || message || statusText;

  console.log("axiosError", msg, axiosError);

  if (!process.client) return;

  const lowerMsg = message ? message.toLowerCase() : "";
  const lowerData = data ? stringify(data).toLowerCase() : "";
  const networkError = lowerMsg.includes("network error") || lowerMsg.includes("timeout of 0ms exceeded") || lowerMsg.includes("endpoint request timed out");
  const unknownError = lowerData.includes("internal server error");
  const timeoutError = lowerData.includes("connection lost") || lowerData.includes("too many requests");
  const retryError = networkError || unknownError || timeoutError;

  // IF NOT 
  const getRequest = config && "string" == typeof config.method && ("get" == config.method.toLowerCase() || "options" == config.method.toLowerCase());
  console.log("axios response error", msg, getRequest, axiosError, config);

  if (process.client && retryError && getRequest) {
    // https://github.com/axios/axios/issues/934
    if (config._retry) {
      await timeout(5000);
    }

    config._retry = true;
    console.log("retryError requesting again.. (" + configUrl + ")", config);
    return axiosInstance.request(config);
  }

  console.error(msg, { config });

  return Promise.resolve(false);
});