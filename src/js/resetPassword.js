import { validateEmail } from "./utility.js";
import { environment } from "./environment.js";

const button = document.getElementById("submit");
const email = document.getElementById("email");
const emailError = document.getElementById("emailError");
const message = document.getElementById("message");
const header = document.getElementById("header");
const modal = document.getElementById("modal");
// const form = document.getElementById("form");

const errorState = {
  emailError: false,
};

const dirtyState = {
  emailDirty: false,
};

function isLoginReady() {
  if (errorState.emailError) {
    button.setAttribute("disabled", "true");
    button.style.backgroundColor = "#CCADDF";
  } else {
    button.removeAttribute("disabled");
    button.style.backgroundColor = "#67089E";
  }
}

function showModal() {
  modal.style.display = "flex";
  setTimeout(() => {
    modal.style.display = "none";
  }, 3000);
}

function handleEmailClick(e) {
  e.preventDefault();
  dirtyState.emailDirty = true;
  isLoginReady();
  validateEmail(email, errorState, emailError);
}

function handleButtonClick(e) {
  e.preventDefault();
  if (errorState.emailError === true) {
    isLoginReady();
    validateEmail(email, errorState, emailError);
    return;
  }

  const headers = new Headers({
    Authorization: `Basic ${btoa(`${environment.id}:${environment.secret}`)}`,
  });

  fetch(`https://services.kredete.dev/otp/send/email/${email.value}`, {
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.statusCode == 200) {
        showModal();
      }
    })
    .catch((err) => console.log(err));
}

email.addEventListener("input", handleEmailClick);
button.addEventListener("click", handleButtonClick);
