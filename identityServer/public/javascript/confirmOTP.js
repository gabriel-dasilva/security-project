fetch('/confirmOTP')
  .then(response => response.json())
  .then(data => {
    const emailElement = document.getElementById('email');
    emailElement.innerText = data.email;
  })
  .catch(error => {
    console.error('Error:', error);
  });