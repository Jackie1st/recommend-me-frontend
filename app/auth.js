import { AsyncStorage } from "react-native";

export const USER_KEY = "auth-demo-key";
export const AUTH_TOKEN = "auth-token";

export const onSignIn = (token) => {
  return AsyncStorage.multiSet([[USER_KEY, "true"],[AUTH_TOKEN, token]]);
}

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};


// export const handleChange = (event) => {
//   console.log(event.target.value); 
// }

//https://reccme.herokuapp.com/oauth/token

const fetchData = (articleID) => {
  return fetch(`https://reccme.herokuapp.com/`)
    .then((response) => response.json())
}

var url = 'https://reccme.herokuapp.com/oauth/token';
var data = {"email": "testboy@test.com", "password": "testtest", "grant_type": "password"}

fetch(url, {
  method: 'POST', // or 'PUT'
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));




