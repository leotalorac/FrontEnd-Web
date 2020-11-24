import axios from "axios";
import {useUser} from 'reactfire'
// IP's
const GraphQL_URL = "https://52.71.79.75/graphql"
// var user = useUser();
//URLS

//Requests


//soap
export const getTeachers = (token) => {
  let promise = new Promise((resolve, reject) => {
    axios
      .post(GraphQL_URL, {
        query: `
        query{
          getTeachers{
            name,
            mail
          }
        }
        `,
        variables: {}
      },
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
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


// NOTIFICATIONS
export const SubscribeUser = (sus,token) => {
  let promise = new Promise((resolve, reject) => {
    axios
      .post(GraphQL_URL,
        {
          query: `
          mutation{
            subscribeUser(subscription:"${sus}"){
              status
            }
          }
            `
        },
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
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

export const PushNotification = (titulo, cuerpo, usuario, token) => {
  let promise = new Promise((resolve, reject) => {
    axios
      .post(GraphQL_URL,
        {
          query: `
          mutation {
            pushNotification(notification: {titulo: "${titulo}", cuerpo: "${cuerpo}", usuario: "${usuario}"}) {
              titulo
              cuerpo
              usuario
            }
          }
            `
        },
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
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

//LDAP

export const LDAPCreateUser = (email, name, surName, password) => {
  let promise = new Promise((resolve, reject) => {
    axios
      .post(GraphQL_URL,
        {
          query: `
          mutation {
            LDAPCreateUser(user: {email: "${email}", name: "${name}", surName: "${surName}", password: "${password}"}) {
              status
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


export const LDAPAuthUser = (email, password) => {
  let promise = new Promise((resolve, reject) => {
    axios
      .post(GraphQL_URL, {
        query: `
        query{
          LDAPAuthUser(email:"${email}",password:"${password}"){
            status
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

/* No la esta usando */
export const getForums = (token) => {
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
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token,
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
//Ya
export const getForumsByCourse = async (id, token) => {
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
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token,
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
//Ya
export const createForum = (userCreator, userCreator_id, course_id, name, token) => {
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
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token,
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
//Ya
export const createCourse = (id, name, forum, token) => {
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
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token,
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
/*const FORUM_IP = "https://3.225.10.138:3000"
const URL_FORUMS = `${FORUM_IP}/forums`;


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
};*/

export const getPosts = (id, token) => {
  let promise = new Promise((resolve, reject) => {
    axios
      .post(GraphQL_URL, {
        query: `
        query{
          getForumPosts(_idForum:"${id}"){
            _id
            title
            content
            userCreator
            userCreator_id
            forum_id
            likes
            comments{
              _id
              content
              userCreator
              userCreator_id
              answer
            }
          }
        }
        `,
        variables: {}
      },
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
          }
        }
      )
      .then((res) => {
        console.log("Esto es lo que imprime la petición")
        console.log(res.data.data.getForumPosts)
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
//Ya
export const createPost = async (id, title, content, userCreator, userCreator_id, token) => {
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
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token,
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
//Ya
export const createComment = (id, idPost, content, userCreator, userCreator_id, token) => {
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
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token,
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
//Ya
export const createAnswer = (id, idPost, idComment, content, userCreator, userCreator_id, token) => {
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
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token,
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
//Ya
export const deletePost = (idForum, idPost, token) => {
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
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token,
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
//Ya
export const deleteComment = (idForum, idPost, idComment, token) => {
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
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token,
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
//Ya
export const deleteAnswer = (idForum, idPost, idComment, idAnswer, token) => {
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
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token,
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
//Ya
export const getAllCourses = (token) => {
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
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token,
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
//Ya
export const getNotesByClass = (id, token) => {
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
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token,
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

//
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


//Ya
export const createNote = (content, id_course,token) => {
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
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token,
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

//Ya
export const getResources = (id_course,token) => {
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
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token,
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

//Ya
export const createResource = (content, id_course, nameUser, token) => {
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
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token,
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
