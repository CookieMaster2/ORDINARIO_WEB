document.addEventListener('DOMContentLoaded', function () {
  const logoutButton = document.querySelector('.logout-button button');

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  logoutButton.addEventListener('click', function () {

    localStorage.removeItem('loggedInUser');

    window.location.href = '/login/login.html';
  });

  console.log('Logged In User:', loggedInUser);

});

// Replace 'https://api.example.com/data' with the actual API endpoint you want to fetch
const apiUrl = 'http://3.16.68.78:3030/my-app/products';

// Make a GET request using the Fetch API
fetch(apiUrl)
  .then(response => {
    // Check if the request was successful (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON in the response
    return response.json();
  })
  .then(data => {
    // Process the retrieved data
    console.log(data);

    // Get the grid container where products will be added
    const gridContainer = document.querySelector('.grid-container');

    // Loop through each product in the data and add it to the grid
    data.slice(0,5).forEach(product => {
      const productElement = createProductElement(product);
      gridContainer.appendChild(productElement);
    });
  })
  .catch(error => {
    // Handle errors
    console.error('Fetch error:', error);
  });


function createProductElement(product) {
  const template = document.getElementById('template-container');
  const clone = document.importNode(template.content, true);

  // Set product image and name
  const productImage = clone.querySelector('.product-image img');
  productImage.src = product.imagen + ".jpeg"; // Replace 'image' with the actual property name in your API response

  const productName = clone.querySelector('.name p');
  productName.textContent = product.nombre; // Replace 'name' with the actual property name in your API response

  return clone;
}

