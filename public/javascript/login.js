const loginForm = document.getElementById('login-form');
const errorMessageElement = document.getElementById('error-message');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form submission

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
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
      const { username } = data;
      localStorage.setItem('username', username);
      window.location.href = 'https://9hhswbztrc.us-east-1.awsapprunner.com/views/confirmOTP.html'; 
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});
