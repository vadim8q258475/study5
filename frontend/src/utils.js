import axios from "axios";
import SETTINGS from "./settings";

function getData(trackPromise, apiUrl, token, setFn) {
  const instance = axios.create({
    baseURL: apiUrl,
    headers: { Authorization: `Token ${token}` },
  });

  trackPromise(
    instance.get().then((resp) => {
      const data = resp.data;
      setFn(data);
      console.log(data)
    })
  );
}

function makeQueryParamList(arr) {
  let st = "";
  let el;
  for (let i = 0; i < arr.length; i++) {
    el = arr[i];
    if (i == arr.length - 1) st += String(el);
    else st += String(el) + "+";
  }
  return st;
}

function makeQueryStrFromObj(obj) {
  let params = "?";
  let value;
  for (let key in obj) {
    value = obj[key];
    if (typeof (value) == String) {
      params += key + "=";
      params += value + "&";
    } else {
      if (value.length > 0) {
        params += key + "=";
        value = makeQueryParamList(value);
        params += value + "&";
      }
    }
  }
  return params;
}

function sendData(url, method, data, params='', setFn) {
  const instance = axios.create({
    baseURL: SETTINGS.BASE_URL,
    headers: { Authorization: `Token ${SETTINGS.TOKEN}` },
    data: data
  });
  if (method == "patch") {
    instance.patch(url + params, data).then((resp) => {
    });
  } else if (method == "delete") {
    instance.delete(url + params, data).then((resp) => {
    });
  } else if (method == "post") {
    instance.post(url + params, data).then((resp) => {
    });
  } else if (method == "get") {
    instance.get(url + params, data).then((resp) => {
      if (setFn) {
        setFn(resp.data);
      }
    });
  }
}

const utils = {
  sendData: sendData,
  getData: getData,
  makeQueryStrFromObj: makeQueryStrFromObj,
};

export default utils;
