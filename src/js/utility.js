const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordFormat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

export function validateEmail (email,errorState,emailError) {
        if (email.value === "" || !email.value.match(mailFormat)) {
        errorState.emailError = true;
        email.style.border = "2px solid #EF4545";
        return emailError.style.display = "block";

    }
    errorState.emailError = false;
    email.style.border = "2px solid #67089E";
    emailError.style.display = "none";
}

export function validatePassword (password,errorState,passwordError,passwordParent) {
        if (password.value === "" || !password.value.match(passwordFormat)) {
          errorState.passwordError = true;
          return (passwordError.style.display = "block");
        }
        errorState.passwordError = false;
        passwordParent.style.border = "2px solid #67089E";
        passwordError.style.display = "none";
}

