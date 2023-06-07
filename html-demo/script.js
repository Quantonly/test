document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();

  var password = document.getElementById('password-input').value;

  fetch('http://localhost:3000/protected-content', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password: password })
  })
  .then(response => {
    if (response.status === 200) {
      return response.text();
    } else {
      throw new Error('Invalid password. Access denied.');
    }
  })
  .then(data => {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('protected-content').innerHTML = data;
    document.getElementById('protected-content').style.display = 'block';
  })
  .catch(error => {
    alert(error)
  });
});
