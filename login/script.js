document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.querySelector('.login-form');

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevents the default form submission

    // Get user input
    const username = document.getElementById('input-usuario').value;
    const password = document.getElementById('input-contrasena').value;

    // Validate input
    if (!username.trim() || !password.trim()) {
      alert('Please fill in both username and password');
      return;
    }

    // Simulate fetching the list of users from the API
    fetch('http://3.16.68.78:3030/my-app/users')
      .then(response => response.json())
      .then(users => {
        // Check if the provided username and password match any registered user
        const matchedUser = users.find(user => user.nombre === username && user.contrasena === password);

        if (matchedUser) {
          console.log('Login successful:', matchedUser);

          // Store the logged-in user in localStorage
          localStorage.setItem('loggedInUser', JSON.stringify(matchedUser));

          alert('Login successful!');
          window.location.href = '../index/index.html';
        } else {
          console.error('Login failed. Invalid username or password.');
          alert('Login failed. Invalid username or password.');
        }
      })
      .catch(error => {
        console.error('Failed to fetch user data:', error);
        alert('Login failed. Please try again.');
      });
  });
});
