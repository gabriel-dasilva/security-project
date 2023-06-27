const loginForm = document.getElementById('register-form');
const errorMessageElement = document.getElementById('error-message');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form submission

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  fetch('/register', {
    method: 'POST',
    body: JSON.stringify({ username, password, confirmPassword}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    const errorMessage = data.error;
    console.log(errorMessage);
    if (errorMessage) {
      errorMessageElement.innerText = errorMessage;
      console.log(errorMessage);
    } else {
      console.log('success');
      window.location.href = 'http://localhost:3000/views/login.html'; 
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});
