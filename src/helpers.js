import axios from "axios";

// IP's
const FORUM_IP = "http://52.200.134.90:3000"
//URLS
const URL_FORUMS = `${FORUM_IP}/forums`;
const URL_POSTS = `${FORUM_IP}/forums`;



//Requests

//GetForums
export const getForums = () => {
  let promise = new Promise((resolve, reject) => {
    axios
      .get(URL_FORUMS)
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

//GetPosts
export const getPosts = async (id) => {
    let promise = new Promise((resolve, reject) => {
      axios
        .get(`${URL_POSTS}/${id}`)
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
