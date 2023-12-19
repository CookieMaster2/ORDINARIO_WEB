document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.querySelector('.login-form');

    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevents the default form submission

        // Get user input
        const nombre = document.getElementById('input-usuario').value;
        const email = document.getElementById('input-correo').value;
        const password = document.getElementById('input-contrasena').value;
        const confirmPassword = document.getElementById('confirm-contrasena').value;

        // Validate input
        if (!nombre.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            alert('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const today = new Date();

        // Simulate registration API call
        const registrationData = {
            nombre: nombre,
            correo_electronico: email,
            contrasena: password,
            fecha_de_creacion: today,
            usuario_de_creacion: nombre,
            fecha_de_actualizacion: today,
            usuario_de_actualizacion: nombre,
            activo: 1,
            numero_de_compras: 0,
            campo_adicional: "0"
        };

        // Simulated API endpoint
        const apiEndpoint = 'http://3.16.68.78:3030/my-app/users';

        // Make a POST request to the API (simulated)
        fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registrationData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Registration successful:', data);
                window.location.href = '/login/login.html'
            })
            .catch(error => {
                console.error('Registration failed:', error);
            });
    });
});

