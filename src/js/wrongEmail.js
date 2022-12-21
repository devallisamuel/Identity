import { validateEmail, } from "./utility.js";


const email = document.getElementById("email");
const button = document.getElementById("submit");
const emailError = document.getElementById("emailError");



const errorState = {
  emailError: false,
};

const dirtyState = {
  emailDirty: false,
};

function isLoginReady() {
  if (dirtyState.emailError && !errorState.emailError) {
      button.removeAttribute("disabled");
      button.style.backgroundColor = "#67089E";
    } else {
      button.setAttribute("disabled", "true");
      button.style.backgroundColor = "#CCADDF";
  }
  console.log(button);
}

function handleEmailChange(e) {
  dirtyState.emailDirty = true;
  isLoginReady();
  validateEmail(email, errorState, emailError);
}

function onFormSubmit(e) {
  e.preventDefault();
}



email.addEventListener("focusout", handleEmailChange);
button.addEventListener("click", onFormSubmit);