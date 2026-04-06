document.getElementById("registerForm").addEventListener("submit", function (e) {

e.preventDefault();

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const agreeTerm = document.getElementById("agreeTerm");


const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");
const agreeError = document.getElementById("agreeError");


firstNameError.textContent = "";
lastNameError.textContent = "";
emailError.textContent = "";
passwordError.textContent = "";
confirmError.textContent = "";
agreeError.textContent = "";

let isValid = true;


if (firstName.value.trim() === "") {
firstNameError.textContent = "Vui lòng nhập họ";
isValid = false;
}

if (lastName.value.trim() === "") {
lastNameError.textContent = "Vui lòng nhập tên";
isValid = false;
}

if (email.value.trim() === "") {
emailError.textContent = "Email không được để trống";
isValid = false;
}

if (password.value.trim() === "") {
passwordError.textContent = "Mật khẩu không được để trống";
isValid = false;
}

if (confirmPassword.value.trim() === "") {
confirmError.textContent = "Vui lòng xác nhận mật khẩu";
isValid = false;
}

if (password.value !== confirmPassword.value) {
confirmError.textContent = "Mật khẩu không khớp";
isValid = false;
}

if (!agreeTerm.checked) {
agreeError.textContent = "Bạn phải đồng ý điều khoản";
isValid = false;
}

if (!isValid) return;


const userData = {
firstName: firstName.value,
lastName: lastName.value,
email: email.value,
password: password.value
};

localStorage.setItem("userData", JSON.stringify(userData));

window.location.href = "./login.html";

});