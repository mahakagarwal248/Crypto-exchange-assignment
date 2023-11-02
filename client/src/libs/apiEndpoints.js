import axios from "axios";
const url = "http://localhost:8080";
export const getData = async (param) => {
  return await axios
    .get(`${url}/data/get`, { params: param })
    .then((res) => {
      console.log("🚀 ~ file: apiEndpoints.js:7 ~ .then ~ res:", res)
      return res;
    })
    .catch((err) => {
      console.log("🚀 ~ file: apiEndpoints.js:11 ~ getData ~ err:", err)
      return err;
    });
};

export const syncData = async () => {
  return await axios
    .get(`${url}/data/save`)
    .then((res) => {
      console.log("🚀 ~ file: apiEndpoints.js:20 ~ .then ~ res:", res)
      return res;
    })
    .catch((err) => {
      console.log("🚀 ~ file: apiEndpoints.js:24 ~ syncData ~ err:", err)
      return err;
    });
};
