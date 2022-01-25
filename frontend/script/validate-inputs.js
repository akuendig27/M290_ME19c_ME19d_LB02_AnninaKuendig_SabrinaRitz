// read form element
let ALL_INPUT_VALID;

// Selectors
const form = document.getElementById('form');
const phoneNumber = document.getElementById('phoneNumber');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const userName = document.getElementById('userName');
const email = document.getElementById('email');
const password = document.getElementById('password');

// Input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Email validation check
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'E-Mail is not valid');
        ALL_INPUT_VALID = false;
    }
}

// Phone validation check
function checkPhone(input) {
    const re = /^(?:(?:|0{1,2}|\+{0,2})41(?:|\(0\))|0)([1-9]\d)(\d{3})(\d{2})(\d{2})$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Phone number is not valid');
        ALL_INPUT_VALID = false;
    }
}

// Last name validation check
function checkLastname(input) {
    const re = (/^[A-Za-z]+$/);
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Last name is not valid');
        ALL_INPUT_VALID = false;
    }
}

// First name validation check
function checkFirstname(input) {
    const re = (/^[A-Za-z]+$/);
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'First name is not valid');
        ALL_INPUT_VALID = false;
    }
}

// Required fields check
function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(function (input) {
            if (input.value.trim() === '') {
                showError(input, `${getFieldName(input)} is required`);
                isRequired = true;
                ALL_INPUT_VALID = false;
            } else {
                showSuccess(input);
            }
    });

    return isRequired;
}

// Input length check
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(
            input,
            `${getFieldName(input)} must be at least ${min} characters`
        );
        ALL_INPUT_VALID = false;
    } else if (input.value.length > max) {
        showError(
            input,
            `${getFieldName(input)} must be less than ${max} characters`
        );
        ALL_INPUT_VALID = false;
    } else {
        showSuccess(input);
    }
}

//Validate password
function checkPassword(input){
    const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    }
    else {
        showError(input, 'Passwort muss zwischen 7 bis 15 Zeichen lang sein und mind. eine Nummer und ein Spezialzeichen beinhalten');
        ALL_INPUT_VALID = false;
    }
}

// Get field name
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function validateForm() {
    if (!checkRequired([userName, email, password, firstName, lastName, phoneNumber])) {
        checkLength(userName, 3, 25);
        checkLength(password, 6, 25);
        checkLength(firstName, 2, 25);
        checkLength(lastName, 2, 50);
        checkPhone(phoneNumber);
        checkEmail(email);
        checkPassword(password);
        checkFirstname(firstName);
        checkLastname(lastName);
    }
}

/**
 * Make a testcall after the page is loaded
 */
window.onload = () => {
    console.log(`Make test call to the server ...`);
    getWelcome().then(
        result => {
            console.log(`Response from server: ${result}`);
        },
        error => {
            console.log(error)
        });
}


// Event listeners
form.addEventListener('submit', function (e) {
    ALL_INPUT_VALID = true;
    // https://www.w3schools.com/jsref/event_preventdefault.asp
    e.preventDefault();

    // Validate form
    validateForm();
    if (ALL_INPUT_VALID) {
        let formData = {
            email: email.value,
            firstName: firstName.value,
            lastName: lastName.value,
            userName: userName.value,
            phoneNumber: phoneNumber.value,
            password: password.value
        }
        console.log(`All input is valid. Send data to server: 
      ${JSON.stringify(formData)}`);

        //Variant 2
        sendForm2(formData).then(
            result => {
                console.log(`Response from server: ${result}`);
                window.location.href = './confirm.html';
            }).catch(err => {
            console.log(`Error occurred: ${err}`)
        });
    } else {
        console.log("At least one validation failed. No data sent to contact-server.");
    }
});


