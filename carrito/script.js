document.addEventListener('DOMContentLoaded', function () {
    const cartContainer = document.getElementById('cart-container');
    const totalContainer = document.getElementById('total-container');
    const buyButton = document.getElementById('buy-button');

    // Retrieve the contents of the local storage "cart"
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

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

        // Eliminate button click event
        const eliminateBtn = cardClone.querySelector('.addToCartBtn');
        eliminateBtn.addEventListener('click', function () {
            eliminateFromCart(product);
        });

        return cardClone;
    }

    // Function to populate modal with product details
    function populateModal(product) {
        // (previous code)
    }

    // Function to eliminate item from the cart
    function eliminateFromCart(product) {
        // Find and remove the item from the cart
        cart = cart.filter(item => item.id !== product.id);
        updateLocalStorageCart();
        updateCartSection();
    }

    // Function to update the local storage "cart"
    function updateLocalStorageCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Function to update the cart section
    function updateCartSection() {
        // Clear existing content in the cart container
        cartContainer.innerHTML = '';

        // Loop through each item in the cart and add cards to the grid
        cart.forEach(product => {
            const cardElement = createAndPopulateCard(product);
            cartContainer.appendChild(cardElement);
        });

        // Calculate and display the total
        const totalPrice = cart.reduce((total, product) => total + product.precio, 0);
        totalContainer.textContent = `Total: $${totalPrice.toFixed(2)}`;
    }

    // Event listener for the "Realizar compra" button
    buyButton.addEventListener('click', function () {
        // Clear the cart
        cart = [];
        updateLocalStorageCart();
        updateCartSection();

        // Display an alert
        alert('Compra realizada con éxito. ¡Gracias por su compra!');
    });

    // Make a call to update the cart section when the page loads
    updateCartSection();
});
