/* Location for holding the scripts for various functions within the website */
// Form valdiation tutorial : https://www.javascripttutorial.net/javascript-dom/javascript-form-validation/

// Run js validate from login
function validatelogin() {
    // Form validation through javascript

    // Remove any preivous alerts on screen

    // constans for form validation
    const emailEl = document.getElementById('email').value;
    const emailError = document.getElementById('emailErr');
    const passwordError = document.getElementById('passwordErr');
    const ValidateEmail = (email) => {
        const re = /[@]/;
        return re.test(email);
    };

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
        console.log('Login input is validated');
        checkLogin() // If login is correct, then run login function
    }
}

// Check Login Function
function checkLogin() {
    fetch('http://127.0.0.1:3000/login/verify', {
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
        console.log(data);
        showAlert(data)
        if (data.login) {
            window.location.replace('main.html');
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

function registration() {
    console.log('DEBUG: Hit registration function');
    fetch('http://127.0.0.1:3000/login/register', {
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
    .then (data => console.log(data))
    .catch(function (err) {
        console.log('something went wrong, register to database', err); // console.log the errors if any
    });
}

