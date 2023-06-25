fetch('/confirmOTP')
  .then(response => response.json())
  .then(data => {
    const emailElement = document.getElementById('email');
    emailElement.innerText = data.maskedEmail;
  })
  .catch(error => {
    console.error('Error:', error);
  });