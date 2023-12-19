document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'http://3.16.68.78:3030/my-app/products';

    // Function to create and populate a card from the template
    function createAndPopulateCard(product) {
        const cardTemplate = document.querySelector('.card');
        const cardClone = cardTemplate.cloneNode(true);
        cardClone.style.display = ''; // Make the cloned card visible

        // Populate the cloned card with data
        const cardImage = cardClone.querySelector('.card-img-top');
        cardImage.src = `${product.imagen}.jpeg`;

        const cardTitle = cardClone.querySelector('.card-title');
        cardTitle.textContent = product.nombre;

        const cardText = cardClone.querySelector('.card-text');
        cardText.textContent = "Precio: " + product.precio + "$";

        // Learn More button click event
        const learnMoreBtn = cardClone.querySelector('.btn-primary');
        learnMoreBtn.addEventListener('click', function () {
            populateModal(product);
        });

        // Add to Cart button click event
        const addToCartBtn = cardClone.querySelector('.addToCartBtn');

        // Check if there is a user in local storage
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!user) {
            // Disable the "Add to Cart" button if no user is found
            addToCartBtn.disabled = true;
        } else {
            addToCartBtn.addEventListener('click', function () {
                addToCart(product);
            });
        }

        return cardClone;
    }

    // Function to populate modal with product details
    function populateModal(product) {
        const modalImg = document.querySelector('.modal-product-img');
        modalImg.src = `${product.imagen}.jpeg`;

        const modalTitle = document.querySelector('.modal-product-title');
        modalTitle.textContent = product.nombre;

        const modalPrice = document.querySelector('.modal-product-price');
        modalPrice.textContent = "Precio: " + product.precio + "$";

        const modalDescription = document.querySelector('.modal-product-description');
        modalDescription.textContent = product.descripcion;

        const modalCategory = document.querySelector('.modal-product-category');
        modalCategory.textContent = "Categoría: " + product.categoria;

        const modalManufacturer = document.querySelector('.modal-product-manufacturer');
        modalManufacturer.textContent = "Fabricante: " + product.fabricante;

        const modalStock = document.querySelector('.modal-product-stock');
        modalStock.textContent = "En stock: " + product.cantidad_en_stock;

        const modalUnit = document.querySelector('.modal-product-unit');
        modalUnit.textContent = "Unidad de medida: " + product.unidad_de_medida;

        // Add more details as needed

        // Open the modal
        const modal = new bootstrap.Modal(document.getElementById('productModal'));
        modal.show();
    }

    // Function to add item to the cart using local storage
    function addToCart(product) {
        // Retrieve existing cart or create a new one
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Add the product to the cart
        cart.push(product);

        // Save the updated cart to local storage
        localStorage.setItem('cart', JSON.stringify(cart));

        // You can display a confirmation message or update the UI as needed
        alert('Item added to cart!');
    }

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

            // Get the grid container where cards will be added
            const gridContainer = document.getElementById('grid-container');

            // Loop through each product in the data and add cards to the grid
            data.forEach(product => {
                const cardElement = createAndPopulateCard(product);
                gridContainer.appendChild(cardElement);
            });
        })
        .catch(error => {
            // Handle errors
            console.error('Fetch error:', error);
        });

    // Check if there is a logged-in user in local storage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const carritoButton = document.querySelector('.index-button button:nth-child(2)');

    if (!loggedInUser) {
        // Disable the "Carrito" button if no user is found
        carritoButton.disabled = true;
    } else {
        carritoButton.addEventListener('click', function () {
            // Handle the click event for the "Carrito" button (redirect to the cart page or perform other actions)
            document.location = '/carrito/carrito.html';
        });
    }
});