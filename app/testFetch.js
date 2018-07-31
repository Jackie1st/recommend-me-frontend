var fetch = require('node-fetch');

var url = 'https://reccme.herokuapp.com/oauth/token';
var data = {"email": "testboy@test.com", "password": "testtest", "grant_type": "password"};
const fetchData = (articleID) =>{
return fetch(url, {
  method: 'POST', // or 'PUT'
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => {
  res.json().then(response_json => console.log(response_json.access_token));
})
// .then(token => console.log(token.access_token))
}

fetchData(); 