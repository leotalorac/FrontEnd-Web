import axios from "axios";

// IP's
const FORUM_IP = "https://52.200.134.90:3000"
const GraphQL_URL = "https://3.238.50.131/graphql"
//URLS
const URL_FORUMS = `${FORUM_IP}/forums`;



//Requests

export const getForums = () => {
  let promise = new Promise((resolve, reject) => {
    axios
      .post(GraphQL_URL, {
        query: `
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
          query: `
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
          query: `
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

//CreateCourse
export const createCourse = (id, name, forum) => {
  let promise = new Promise((resolve, reject) => {
    axios
      .post(GraphQL_URL,
        {
          query: `
            mutation{
              createCourse(course:{id:${id}, name:"${name}", forum:"${forum}"}){
                ok
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
          query: `
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
          query: `
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
          query: `
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



//deletePost
export const deletePost = (idForum, idPost) => {
  let promise = new Promise((resolve, reject) => {
    axios
      .post(GraphQL_URL,
        {
          query: `
            mutation{
              deletePost(_idForum:"${idForum}", _idPost:"${idPost}"){
                _id
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

//deleteComment
export const deleteComment = (idForum, idPost, idComment) => {
  let promise = new Promise((resolve, reject) => {
    axios
      .post(GraphQL_URL,
        {
          query: `
          mutation{
            deletePostComment(_idForum:"${idForum}", _idPost:"${idPost}", _idComment:"${idComment}"){
              _id
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

//deleteAnswer
export const deleteAnswer = (idForum, idPost, idComment, idAnswer) => {
  let promise = new Promise((resolve, reject) => {
    axios
      .post(GraphQL_URL,
        {
          query: `
          mutation{
            deleteCommentAnswer(_idForum:"${idForum}", _idPost:"${idPost}", _idComment:"${idComment}", _idAnswer:"${idAnswer}"){
              _id
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
        query: `
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
        query: `
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

export const RegisterUser = (email, displayName, password) => {

  let promise = new Promise((resolve, reject) => {
    axios
      .post(GraphQL_URL,
        {
          query: `
              mutation{
                createUser(user:{email: "${email}", displayName: "${displayName}", password:"${password}"}){
                  displayName 
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
}

export const createNote = (content, id_course, id_user) => {
  let promise = new Promise((resolve, reject) => {
    axios
      .post(GraphQL_URL,
        {
          query: `
              mutation{
                createNote(note:{content:"${content}",id_user:2,score:0,id_course:${id_course}}){
                  ok
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


export const getResources = (id_course) => {
  let promise = new Promise((resolve, reject) => {
    axios
      .post(GraphQL_URL,
        {
          query: `
              query{
                allResourcesOfClass(id:${id_course}){
                  idUser
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

export const createResource = (content, id_course, nameUser) => {
  let promise = new Promise((resolve, reject) => {
    axios
      .post(GraphQL_URL,
        {
          query: `
              mutation{
                createResource(resource:{idUser:"${nameUser}",idClase:${id_course},content:"${content}"}){
                  message
                  id
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
