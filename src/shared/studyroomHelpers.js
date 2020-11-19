import axios from "axios";


const GraphQL_URL = "https:///52.71.79.75/graphql"


//Ya
export const getStudyRooms = async (id, token) => {
  let promise = new Promise((resolve, reject) => {
    axios
    .post(GraphQL_URL, {
      query:`
      query{
        get_study_rooms(courseId:"${id}"){
          _id
          name
          resources{
            _id
            resource
            author
            authorImage
            description
          }
          students{
            _id
            name
            picture
            email
          }
          calendarEventId
          ownerEmail
          ownerName
          description
          date
          duration
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

//Ya
export const inscribeUser = (sr_id, student_name, student_picture,student_email, token) => {
    
  let promise = new Promise((resolve, reject) => {
        axios
        .post(GraphQL_URL,
          {
            query:`
            mutation{
              inscribe_student(
                sr_id: "${sr_id}",
                student: {
                  name: "${student_name}"
                  picture: "${student_picture}"
                  email: "${student_email}"
                }
                
                ){
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
}

//Ya
export const deleteUser = (sr_id, student_id, token) => {
    
  let promise = new Promise((resolve, reject) => {
        axios
        .post(GraphQL_URL,
          {
            query:`
            mutation{
              delete_student(
                sr_id: "${sr_id}",
                rmstudent: {
                  _id: "${student_id}"
                }
                 
                
                ){
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
}

export const createSR = (name, description, date, duration, ownername, ownerEmail, courseId, token) => {
    
  let promise = new Promise((resolve, reject) => {
        axios
        .post(GraphQL_URL,
          {
            query:`
            mutation{
              create_study_room(studyroom:
                {
                  name: "${name}",
                  description: "${description}",
                  date: "${date}",
                  duration: ${duration},
                  ownerName: "${ownername}",
                  ownerEmail: "${ownerEmail}",
                  courseId: "${courseId}"
                }){
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
}
