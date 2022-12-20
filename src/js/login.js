import { validateEmail,validatePassword } from "./utility.js";

const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordParent = document.getElementById("password-parent");
const button = document.getElementById("submit");
const clearImage = document.getElementById("clear"); 
const openPassword = document.getElementById("open"); 
const closePassword = document.getElementById("close"); 

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

const errorState = {
    passwordError: false,
    emailError: false,
};

const dirtyState = {
    passwordDirty:false,
    emailDirty:false,
}


function isLoginReady () {
    if (Object.values(dirtyState).every((val) => val === true)) {
        button.disabled = true;
        button.style.backgroundColor = "##CCADDF";
    } else {
        button.removeAttribute("disabled");
        button.style.backgroundColor = "#67089E";
    }
}

function handleEmailChange (e) {
    dirtyState.emailDirty = true;
    isLoginReady();
    validateEmail(email,errorState,emailError);
}

function handlePasswordChange (e) {
    e.preventDefault();
    dirtyState.passwordDirty = true;
     clearImage.style.display = "flex";
    isLoginReady();
    validatePassword(password,errorState,passwordError,passwordParent);
}

function handleResetPassword (e) {
    e.preventDefault();
    password.value = "";
}

function handleVisibility (e) {
    e.preventDefault();
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    if(type === "password") {
       openPassword.style.display = "none";
       closePassword.style.display = "flex";
    } else {
        openPassword.style.display = "flex";
        closePassword.style.display = "none";
    }
}

function onFormSubmit (e) {
    e.preventDefault();
    if(password.value === "" || email.value === "") return;
}

email.addEventListener("focusout", handleEmailChange);
openPassword.addEventListener("click", handleVisibility);
closePassword.addEventListener("click", handleVisibility);
clearImage.addEventListener("click", handleResetPassword);
password.addEventListener("input", handlePasswordChange);
password.addEventListener("focusin", () => {passwordParent.style.border = "2px solid #67089E";});
password.addEventListener("focusout", handlePasswordChange);
button.addEventListener("click", onFormSubmit);