/* eslint-disable no-console */
import "whatwg-fetch";
import {API_TOKEN} from "../constants/constant";

export const get = (url = "", params = {}) => {
  return new Promise((resolve, reject) => {
    let extraUrl = "";
    if (params) {
      const paramUrls = [];
      Object.keys(params).forEach((key) => {
        typeof params[key] !== "undefined" &&
        paramUrls.push(`${key}=${params[key]}`);
      });
      if (paramUrls.length) extraUrl = `?${paramUrls.join("&")}`;
    }
    let totalItemNumber;
    fetch(url + extraUrl, {
      headers: {
        "Content-Type": "application/json",
        "apiToken": API_TOKEN,
      },
    })
      .then((response) => {
        totalItemNumber = response.headers.get("X-Total-Count");
        return response.json();
      })
      .then(
        (result) => {
          if (result) {
            let dataFetched = {};
            dataFetched.data = result;
            dataFetched.totalItemNumber = totalItemNumber;
            dataFetched.params = params;
            resolve(dataFetched);
          } else {
            console.log(result.data || "fetching data failed");
            reject(params);
          }
        },
        (err) => {
          console.log(err);
          reject(params);
        }
      )
      .catch((err) => {
        console.log(err);
        reject(params);
      });
  });
};

