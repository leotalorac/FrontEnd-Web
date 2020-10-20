import axios from "axios";

// IP's
const FORUM_IP = "http://52.200.134.90:3000"
const GraphQL_URL = "http://3.138.86.155/graphql"
//URLS
const URL_FORUMS = `${FORUM_IP}/forums`;



//Requests

export const getForums = () => {
  let promise = new Promise((resolve, reject) => {
    axios
      .post(GraphQL_URL, {
        query:`
        query{
          getForums{
            name,
            _id
          }
        }
        `,
        variables: {}
      },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then((res) => {
        console.log(res.data.data.getForums)
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
export const getForumsByCourse = async (id) => {
  let promise = new Promise((resolve, reject) => {
    axios
      .post(GraphQL_URL,
        {
          query:`
          query{
            getForumsByCourse(course_id:"${id}"){
              name,
              _id
            }
          }
          `,
          variables: {}
        },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
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

//CreateForum
export const createForum = (userCreator, userCreator_id, course_id, name) => {
    let promise = new Promise((resolve, reject) => {
        axios
          .post(GraphQL_URL,
            {
              query:`
              mutation{
                createForum(forum:{name:"${name}", userCreator:"${userCreator}", userCreator_id: "${userCreator_id}",course_id: "${course_id}"}){
                  name
                }
              }
              `
            },
              {
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            )
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            console.log(error);
            reject(new Error(error));
          });
      });
    return promise;
  };

//GetPosts
export const getPosts = async (id) => {
    let promise = new Promise((resolve, reject) => {
      axios
        .get(`${URL_FORUMS}/${id}`)
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


//CreatePost
export const createPost = async (id, title, content, userCreator, userCreator_id) => {
    let promise = new Promise((resolve, reject) => {
        axios
          .post(GraphQL_URL,
            {
              query:`
              mutation{
                createPost(_idForum:"${id}", post:{title:"${title}", content:"${content}", userCreator:"${userCreator}", userCreator_id:"${userCreator_id}", forum_id:"${id}"}){
                  content
                }
              }
              `
            },
              {
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            )
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            console.log(error);
            reject(new Error(error));
          });
      });
    return promise;
  };

  //CreateComment
export const createComment = (id, idPost, content, userCreator, userCreator_id) => {
    let promise = new Promise((resolve, reject) => {
        axios
          .post(GraphQL_URL,
            {
              query:`
              mutation{
                createPostComment(_idForum:"${id}", _idPost:"${idPost}", postComment:{content:"${content}", userCreator:"${userCreator}", userCreator_id:"${userCreator_id}"}){
                  content
                }
              }
              `
            },
              {
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            )
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            console.log(error);
            reject(new Error(error));
          });
      });
    return promise;
  };

//CreateAnswer
export const createAnswer = (id, idPost, idComment, content, userCreator, userCreator_id) => {
    let promise = new Promise((resolve, reject) => {
        axios
          .post(GraphQL_URL,
            {
              query:`
                mutation{
                  createCommentAnswer(_idForum:"${id}", _idPost:"${idPost}",_idComment:"${idComment}", answer:{content:"${content}", userCreator:"${userCreator}", userCreator_id:"${userCreator_id}"}){
                    content
                  }
                }
              `
            },
              {
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            )
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            console.log(error);
            reject(new Error(error));
          });
      });
    return promise;
  };

  //Get all courses

  export const getAllCourses = () => {
    let promise = new Promise((resolve, reject) => {
      axios
        .post(GraphQL_URL, {
          query:`
          query{
            getAllCourses{
              id_course,
              name
              
            }
          }
          `,
          variables: {}
        },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        .then((res) => {
          console.log(res.data.data.getForums)
          resolve(res);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
    return promise;
  };


  //Get notes by class

  export const getNotesByClass = (id) => {
    let promise = new Promise((resolve, reject) => {
      axios
        .post(GraphQL_URL, {
          query:`
          query{
            getNotesByClass(id_course:${id}){
              id_note
              content
              id_user
              score
              id_course
            }
          }
          `,
          variables: {}
        },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
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

 