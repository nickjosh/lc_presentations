document.addEventListener('DOMContentLoaded', function () {
    var nameInput = document.getElementById('name');
    var nameError = document.getElementById('name-error');
    var phoneInput = document.getElementById('phone');
    var phoneError = document.getElementById('phone-error');

    var form = document.getElementById('form');

    var nameRegex = /^\S+\s+\S+$/;
    var phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

    form.addEventListener('submit', function(event) {
        console.log('SUBMITTED');

        // Check name is two words
        if (!nameRegex.test(nameInput.value)) {
            nameError.innerHTML = 'Name must include first and last names.';
            event.preventDefault();
        } else {
            nameError.innerHTML = '';
        }

        // Check phone number is correct
        if (!phoneRegex.test(phoneInput.value)) {
            phoneError.innerHTML = 'Phone numbers are of the form ddd-ddd-dddd.';
            event.preventDefault();
        } else {
            phoneError.innerHTML = '';
        }

    });
});
