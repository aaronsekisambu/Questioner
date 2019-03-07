const userName = document.getElementById('userName');
const loginPassword = document.getElementById('userPassword');
const singIn = document.getElementById('signIn');
const signUpButton = document.getElementById('signUpButton');

const myHeaders = new Headers();
myHeaders.append('Accept', 'application/json');
myHeaders.append('Access-Control-Allow-Origin', '*');
myHeaders.append('Content-type', 'application/json');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJh' +
  'ZWJkMDZmNS1hZjU1LTQyOWUtOTA3MC1lZDM4YzkxNzUwYTgiLCJ1c2VybmFtZSI6Ik1ha2' +
  'UgaXQiLCJlbWFpbCI6Im5vdy5rYW1wYWxhQGdtYWlsLmNvbSIsImZpcnN0bmFtZSI6ImthbXBhb' +
  'GEiLCJpYXQiOjE1NTA1MDEzMzN9.fcXZ7dggJ_0V6nyHtRvdf-3fkMUbNVvMxkCHdez86AM';

localStorage.setItem('token', token);
myHeaders.append('Authorization', `Bearer ${token}`);

const loginURL = 'http://localhost:5000/api/v1/auth/login';
const signUpURL = 'http://localhost:5000/api/v1/auth/signup';

let userLogin = (e)=> {
  e.preventDefault();
  let email = userName.value;
  let password = loginPassword.value;
  let meetUpsPage = '../../UI/html/createMeetUps.html';
  fetch(loginURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'content-type': 'application/json',
      myHeaders},
    body:JSON.stringify({ email: email, password: password}),
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === 202){
        location.replace(meetUpsPage);
        console.log(data);
      }else if (data.status === 401){
        alert('Incorrect password or email');
        console.log('Incorrect password or email');
      }

    })
    .catch(err => console.log(err));
};
if(singIn){
  singIn.addEventListener('click', userLogin);
}

let userSignUp = (e) => {
  const firstName = document.getElementById('firstName').value;
  console.log(firstName);
  const lastName = document.getElementById('lastName').value;
  console.log(lastName);
  const emailAddress = document.getElementById('emailAddress').value;
  console.log(emailAddress);
  const signUpPassword = document.getElementById('password').value;
  console.log(signUpPassword);
  const confirmPassword = document.getElementById('confirmPassword').value;
  console.log(confirmPassword);
  e.preventDefault();
  fetch(signUpURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      firstname: firstName,
      lastname: lastName,
      email: emailAddress,
      password: signUpPassword,
      confirmPassword: confirmPassword
    })
  })
    .then(res => res.json())
    .then(data => console.log(data));
};
signUpButton.addEventListener('click', userSignUp);

