import axios from "axios";


const GraphQL_URL = "http://3.138.86.155/graphql"

export const postStudyRoom = () => {
  let promise = new Promise((resolve, reject) => {
    axios
    .post(GraphQL_URL, {
      mutation:`
        mutation{
          create_study_room{
            name: "III - Reunión / Calculo Multivariado",
            description: "Welcome to Tijuana",
            date: "2020-10-07T00:46:15.794Z",
            duration: 30,
            ownerName: "Ana Guzman",
            ownerEmail: "pedromosquete69@gmail.com",
            courseId: "courseId2"
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

export const getStudyRooms = () => {
  let promise = new Promise((resolve, reject) => {
    axios
    .post(GraphQL_URL, {
      query:`
      query{
        get_study_rooms{
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