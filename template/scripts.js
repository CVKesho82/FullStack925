/* Location for holding the scripts for various functions within the website */

// Run js validate from login
function validatelogin() {
    // constants for form validation
    const emailEl = document.getElementById('email').value;
    const ValidateEmail = (email) => {
        const re = /[@]/;
        return re.test(email);
    };

    const checkEmail = () => {
        let text = ' ';
        let valid = false;
        if (emailEl === null) {
            text = 'Email cannot be blank';
        } else if (!ValidateEmail(emailEl)) {
            text = 'Please enter a valid email';
        } else {
            valid = true;
        }
        document.getElementById("loginEmailErr").innerHTML = text;
        return valid;
    }
    
    const checkPassword = () => {
        let text = '';
        let valid = false;
        let passwordEl = document.getElementById("passwordID").value;
        if (passwordEl === "") {
            text = 'Password cannot be blank.';
        } else if (passwordEl.length < 4) {
            text = 'Password must be at least 4 characters long';
        } else {
            valid = true;
        }
        document.getElementById("passwordErr").innerHTML = text;
        return valid;
    }
    
    // validate forms
    let isEmailValid = checkEmail();
    let isPasswordValid = checkPassword();
    let isFormValid = isEmailValid && isPasswordValid;

    // submit to the server if the form is valid
    if (isFormValid) {
        // console.log('Login input is validated');
        checkLogin() // If login is correct, then run login function
    }
}

// Check Login Function
function checkLogin() {
    fetch('https://adultingfullstack.herokuapp.com/login/verify', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {email: document.getElementById("email").value,
            password: document.getElementById("passwordID").value})
    }).then (res => res.json())
    .then (data => {
        // console.log(data);
        showAlert(data)
        if (data.login) {
            window.location.replace('forummain.html');
        }
    })
    .catch(function (err) {
        console.log('something went wrong, call on database', err); // console.log the errors if any
    });
}

function showAlert(data) {
    if (data.login) { // If login is true
        document.getElementById("correctLogin").style = "display: show";
    } else {
        document.getElementById("incorrectText").innerHTML = data.message;
        document.getElementById("IncorrectLogin").style = "display: show";
    }
}

// Registration form valdiation, then trigger POST function to user database
function checkRegistration() {
    const emailEl = document.getElementById('registerEmail').value;
    const ValidateEmail = (email) => {
        const re = /[@]/;
        return re.test(email);
    };


    // Check email is not null/valid email
    const checkEmail = () => {
        let text = '';
        let valid = false;
        if (emailEl === null) {
            text = 'Email cannot be blank';
        } else if (!ValidateEmail(emailEl)) {
            text = 'Please enter a valid email';
        } else {
            valid = true;
        }
        document.getElementById("emailErr").innerHTML = text;
        return valid;
    }
    // Check password is >4 characters/confirm password matches
    const checkPassword = () => {
        let text = '';
        let confirmText = '';
        let valid = false;
        let passwordEl = document.getElementById("registerPassword").value;
        let confirmPasswordEl = document.getElementById("passwordConfirm").value;
        // console.log('passwords', passwordEl, confirmPasswordEl);
        if (passwordEl === "" || confirmPasswordEl === "") {
            text = 'Password cannot be blank.';
        } else if (passwordEl.length < 4) {
            text = 'Password must be at least 4 characters long';
        } else if (passwordEl !== confirmPasswordEl) {
            confirmText = 'Passwords must match'
        } else {
            valid = true;
        }
        document.getElementById("passwordErr").innerHTML = text;
        document.getElementById("passwordErrConfirm").innerHTML = confirmText;
        return valid;
    }

    // Check first name/last name are not null
    const checkName = () => {
        let text = '';
        let valid = false;
        let first = document.getElementById("registerFirst").value.trim();
        let last = document.getElementById("registerLast").value.trim();
        // console.log('first, last', first, last);
        if (first === "" || last === "") {
            text = 'First or Last name cannot be empty'
            document.getElementById("lastNameErr").innerHTML = text;
        } else {
            valid = true;
        }
        document.getElementById("lastNameErr").innerHTML = text;
        return valid;
    }

    // If all valid, then call registerUser()
     let isEmailValid = checkEmail();
     let isPasswordValid = checkPassword();
     let isNameValid = checkName();
     let isFormValid = isEmailValid && isPasswordValid && isNameValid;

    // submit to the server if the form is valid, then try to register user
    if (isFormValid) {
        // console.log('Registration input is validated');
        registerUser()
    }
}
// Regiester a user
function registerUser() {
    // console.log('DEBUG: Hit registration function');
    fetch('https://adultingfullstack.herokuapp.com/login/register', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(
            {email: document.getElementById("registerEmail").value.toLowerCase(),
            password: document.getElementById("registerPassword").value,
            firstName: document.getElementById("registerFirst").value.toLowerCase(),
            lastName: document.getElementById("registerLast").value.toLowerCase(),
            })
        }).then (res => res.json())
        .then (data => {
            // console.log(data);
            showAlertReg(data);
            if (data.registration) {
                window.location.replace("https://adultingfullstack.herokuapp.com/forummain.html");
            }
            // If user was able to succesfully login, then redirect user to forummain.html
        })
        .catch(function (err) {
            console.log('something went wrong, register to database', err); // console.log the errors if any
        });
    }

function showAlertReg(data) {
    // console.log('debug: hit show alert function');
    // console.log('ShowAlertRegData', data);
    if (data.registration) { // If login is true
        document.getElementById("correctRegistration").style = "display: show";
        // Redirect user to the forum main
        location.href = "https://www.javascripttutorial.net/";

    } else { // If registartion didn't work
        document.getElementById("incorrectReg").innerHTML = data.message;
        document.getElementById("incorrectReg").style = "display: show";
    }
}
