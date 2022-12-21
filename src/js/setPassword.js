import { confirmValidatePassword, validatePassword } from "./utility.js";

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const passwordParent = document.getElementById("password-parent");
const confirmPasswordParent = document.getElementById(
  "confirmPasswordParent"
);
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const submissionError = document.getElementById(
  "confirm-submission-passwordError"
);
const button = document.getElementById("submit");

const clearImage = document.getElementById("clear");
const openPassword = document.getElementById("open");
const closePassword = document.getElementById("close");
const confirmClearImage = document.getElementById("confirmClear");
const confirmOpenPassword = document.getElementById("confirmOpen");
const confirmClosePassword = document.getElementById("confirmClose");

const errorState = {
  passwordError: false,
  confirmPasswordError: false,
};

const dirtyState = {
  passwordDirty: false,
  confirmPasswordDirty: false,
};

function isLoginReady() {
  if (
    Object.values(dirtyState).every((val) => val === true) &&
    Object.values(errorState).every((val) => val === false)
  ) {
    button.removeAttribute("disabled");
    button.style.backgroundColor = "#67089E";
} else {
    button.disabled = true;
    button.style.backgroundColor = "##CCADDF";
  }
}

function handlePasswordChange(e) {
  e.preventDefault();
  dirtyState.passwordDirty = true;
  clearImage.style.display = "flex";
  isLoginReady();
  validatePassword(password, errorState, passwordError, passwordParent);
}
function handleConfirmPasswordChange(e) {
  e.preventDefault();
  dirtyState.confirmPasswordDirty = true;
  confirmClearImage.style.display = "flex";
  isLoginReady();
  confirmValidatePassword(
    confirmPassword,
    errorState,
    confirmPasswordError,
    confirmPasswordParent
  );
}

function handleVisibility(e,pass,openPass,closePass) {
  e.preventDefault();
  e.stopPropagation();
  const type =
    pass.getAttribute("type") === "password" ? "text" : "password";
  pass.setAttribute("type", type);
  if (type === "password") {
    openPass.style.display = "none";
    closePass.style.display = "flex";
  } else {
    openPass.style.display = "flex";
    closePass.style.display = "none";
  }
}
function handleConfVisibility(e,pass,openPass,closePass) {
  e.preventDefault();
  e.stopPropagation();
  const type =
    pass.getAttribute("type") === "password" ? "text" : "password";
  pass.setAttribute("type", type);
  if (type === "password") {
    openPass.style.display = "none";
    closePass.style.display = "flex";
  } else {
    openPass.style.display = "flex";
    closePass.style.display = "none";
  }
}

function handleResetPassword(e,pass) {
  e.preventDefault();
  pass.value = "";
}

password.addEventListener("input", handlePasswordChange);
password.addEventListener("focusin", () => {
  passwordParent.style.border = "2px solid #67089E";
});
password.addEventListener("focusout", handlePasswordChange);

confirmPassword.addEventListener("input", handleConfirmPasswordChange);
confirmPassword.addEventListener("focusin", () => {
  confirmPasswordParent.style.border = "2px solid #67089E";
});
confirmPassword.addEventListener("focusout", handleConfirmPasswordChange);

openPassword.addEventListener("click", (e) =>
  handleVisibility(e, password, openPassword, closePassword)
);
closePassword.addEventListener("click", (e) =>
  handleVisibility(e, password, openPassword, closePassword));

confirmOpenPassword.addEventListener("click", (e) =>
  handleConfVisibility(
    e,
    confirmPassword,
    confirmOpenPassword,
    confirmClosePassword
  )
);
confirmClosePassword.addEventListener("click", (e) =>
  handleConfVisibility(e, confirmPassword, confirmOpenPassword, confirmClosePassword));
clearImage.addEventListener("click", (e) => handleResetPassword(e,password));
confirmClearImage.addEventListener("click", (e) =>
  handleResetPassword(e, confirmPassword)
);
