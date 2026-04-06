document.querySelector("form").addEventListener("submit",function(e){

e.preventDefault();

const email=document.getElementById("email");
const password=document.getElementById("password");

const emailError=document.getElementById("emailError");
const passwordError=document.getElementById("passwordError");

emailError.textContent="";
passwordError.textContent="";

let isValid=true;

if(email.value.trim()===""){
emailError.textContent="Email không được để trống";
isValid=false;
}

if(password.value.trim()===""){
passwordError.textContent="Mật khẩu không được để trống";
isValid=false;
}

if(!isValid) return;

const storedData=localStorage.getItem("userData");

if(storedData){

const user=JSON.parse(storedData);

if(email.value===user.email && password.value===user.password){

window.location.href="./dashboard.html"

}else{

passwordError.textContent="Email hoặc mật khẩu không đúng"

}

}else{

emailError.textContent="Tài khoản chưa tồn tại"

}

});