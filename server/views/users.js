const userName = document.getElementById('userName');
const loginPassword = document.getElementById('userPassword');
const singIn = document.getElementById('signIn');
const signUpButton = document.getElementById('signUpButton');
let errors = document.querySelector('#messagePops');
let popErrors = document.querySelector('#secondPops');


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
      }else if (data.status === 401){
        errors.style.display = 'block';
        errors.textContent = 'Incorrect password or email';
      }
      if(data.status === 403){
        errors.style.display = 'block';
        errors.textContent = 'Please Insert Email and Password';
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
  function validate() {
    const signUpPassword = document.getElementById('password').value;
    console.log(signUpPassword);
    const confirmPassword = document.getElementById('confirmPassword').value;
    console.log(confirmPassword);
    if(signUpPassword !== confirmPassword){
      errors.style.display = 'block';
      errors.textContent = 'Password did not match';
    }
  }
  let questionsPage = '../../UI/html/viewMeetupsPage';
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
      password: validate()
    })
  })
    .then(res => res.json())
    .then(data => {
      switch (data.status) {
      case 201:
        location.replace(questionsPage);
        popErrors.style.display = 'block';
        popErrors.textContent = 'Successfully Created';
        break;
      case 400:
        popErrors.style.display = 'block';
        popErrors.textContent = 'Some values are missing';
        break;
      default:
        popErrors.style.display = 'block';
        popErrors.textContent = 'Unauthorised';
      }
      console.log(data.data);
    });
};
if(signUpButton){
  signUpButton.addEventListener('click', userSignUp);
}


