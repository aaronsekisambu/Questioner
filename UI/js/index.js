// Create a pop page for creating a meet up and meet up tittle.

// Get the button that opens the comment window
let btnOpenCommentArea = document.getElementById('on-off-meetup-btns-comment');
// Get the img that closes the comment window
let btnCloseCommentArea = document.getElementById('btn-close-comment');
// Get the comment window
let createCommentWindow = document.getElementById('begin-comment-area');



// Listen for open click
btnOpenCommentArea.addEventListener('click', openComment);

// Listen for close click
btnCloseCommentArea.addEventListener('click', closeComment);

//function to open coment area
function openComment () {
  createCommentWindow.style.opacity = 1;
  console.log('Open');
}

// function to close comment area
function closeComment () {
  createCommentWindow.style.opacity = 0;
  console.log('closed');
}



currentDate = () => {
  let today = new Date();
  let dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  return today.toLocaleDateString('en-US', dateOptions);
};

// Difine todays Month and year.
document.getElementById('current-month').innerText = currentDate();



