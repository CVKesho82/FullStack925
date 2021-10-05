/*Passord Field Validation*/
function validatePassword(event) {
    //event.preventDefault();
    const password = document.querySelector('#password');
    const passwordConfirm = document.querySelector('#passwordConfirm');

    if (password.value !== passwordConfirm.value) {
         alert('Passwords Do Not Match');
        return false;
    }
}

