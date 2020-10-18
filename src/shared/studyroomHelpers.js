import axios from "axios";

// IP's
const STUDYROOM_IP = "http://http://54.92.227.88:3000"
//URLS
const URL_STUDYROOM = `${STUDYROOM_IP}/studyrooms`;


export const getStudyrooms = () => {
    let promise = new Promise((resolve, reject) => {
        axios
        .get(URL_STUDYROOM)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
    return promise;
  };