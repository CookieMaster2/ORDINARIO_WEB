// Make a simple GET request
fetch('http://3.16.68.78:3030/my-app/users')
  .then(response => {
    // Check if the request was successful (status code 200-299)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Parse the response as JSON
    return response.json();
  })
  .then(data => {
    // Do something with the data
    console.log(data);
  })
  .catch(error => {
    // Handle errors during the fetch
    console.error('Fetch error:', error);
  });