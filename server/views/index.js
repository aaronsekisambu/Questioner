
const myHeaders = new Headers();
myHeaders.append('Accept', 'application/json');
myHeaders.append('Access-Control-Allow-Origin', '*');
myHeaders.append('Content-type', 'application/json');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQi' +
  'OiJhZWJkMDZmNS1hZjU1LTQyOWUtOTA3MC1lZDM4YzkxNzUwYTgiLCJ1c2VybmFtZSI6IiIsImVtYWls' +
  'Ijoibm93LmthbXBhbGFAZ21haWwuY29tIiwiZmlyc3RuYW1lIjoia2FtcGFsYSIsImlhdCI6MTU0OTYzMzg3' +
  'Nn0.vCfSahpsrLswCU-NxysAPo5Ls99yFMlDAT4fNNS_XXU';

localStorage.setItem('token', token);
myHeaders.append('Authorization', `Bearer ${token}`);

let getUsers = (e)=> {
  e.preventDefault();
  fetch('http://localhost:5000/api/v1/users', { headers: myHeaders })
    .then(res => res.json())
    .then(data => console.log(data.data.user[0].email))
    .catch(err => console.log(err));
};

document.getElementById('signIn').addEventListener('click', getUsers);





