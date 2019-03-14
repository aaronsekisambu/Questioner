const userName = document.getElementById('userName');
const loginPassword = document.getElementById('userPassword');
const singIn = document.getElementById('signIn');
const signUpButton = document.getElementById('signUpButton');
let errors = document.querySelector('#messagePops');
let popErrors = document.querySelector('#secondPops');
let questionsPage = '../../UI/html/viewMeetupsPage.html';
let meetUpsPageAdmin = '../../UI/html/createMeetUps.html';
let tokenValue;

const myHeaders = new Headers();
myHeaders.append('Accept', 'application/json');
myHeaders.append('Access-Control-Allow-Origin', '*');
myHeaders.append('Content-type', 'application/json');

const loginURL = 'http://localhost:5000/api/v1/auth/login';
const signUpURL = 'http://localhost:5000/api/v1/auth/signup';

let userLogin = (e)=> {
  e.preventDefault();
  let email = userName.value;
  let password = loginPassword.value;
  fetch(loginURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'content-type': 'application/json',
      myHeaders},
    body:JSON.stringify({
      email: email,
      password: password
    }),
  })
    .then(res => res.json())
    .then(data => { console.log(data);
      switch (data.data.message){
      case 'Successfully logged in':
        tokenValue = data.data.token;
        localStorage.setItem('token', tokenValue);
        break;
      case 'Admin user selected':
        location.replace(meetUpsPageAdmin);
        break;
      case 'Not Admin user':
        location.replace(questionsPage);
        break;
      case 'Please Insert Email and Password':
        errors.style.display = 'block';
        errors.textContent = 'Please Insert Email and Password';
        break;
      case 'Incorrect password or email':
        errors.style.display = 'block';
        errors.textContent = 'Incorrect password or email';
        break;
      case 'The email you entered is not incorrect':
        errors.style.display = 'block';
        errors.textContent = `${ email } not found`;
        break;
      default:
        errors.style.display = 'block';
        errors.textContent = 'Please check your credentials';
      }
    })

    .catch(err => console.log(err));
};
if(singIn){
  singIn.addEventListener('click', userLogin);
}

let userSignUp = (e) => {
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const emailAddress = document.getElementById('emailAddress').value;

  function validate() {
    const signUpPassword = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if(signUpPassword !== confirmPassword){
      errors.style.display = 'block';
      errors.textContent = 'Password did not match';
      return 0 ;
    }
    return signUpPassword;
  }
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
      switch (data.data.message) {
      case 'Successfully Created':
        location.reload();
        popErrors.style.display = 'block';
        popErrors.textContent = 'Successfully Created';
        break;
      case 'Some values are missing':
        popErrors.style.display = 'block';
        popErrors.textContent = 'Some values are missing';
        break;
      case 'username or email already exists':
        popErrors.style.display = 'block';
        popErrors.textContent = 'username or email already exists';
        break;
      case  'Please enter a valid email address':
        popErrors.style.display = 'block';
        popErrors.textContent = 'Please enter a valid email address';
        break;
      default:
        popErrors.style.display = 'block';
        popErrors.textContent = 'Unauthorised';
      }
    })
    .catch(error => console.log(error));
};
if(signUpButton){
  signUpButton.addEventListener('click', userSignUp);
}


