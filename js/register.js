document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const agreeTerm = document.getElementById('agreeTerm').checked;

    if (firstName === "" || lastName === "") {
        alert("Họ và tên không được để trống!");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
        alert("Email không được để trống!");
        return;
    } else if (!emailRegex.test(email)) {
        alert("Email phải đúng định dạng (ví dụ: user@example.com)!");
        return;
    }

    if (password === "") {
        alert("Mật khẩu không được để trống!");
        return;
    } else if (password.length < 8) {
        alert("Mật khẩu phải có tối thiểu 8 ký tự!");
        return;
    }

    if (!agreeTerm) {
        alert("Vui lòng tích chọn đồng ý với chính sách và điều khoản!");
        return;
    }

    const newUser = {
        fullName: `${firstName} ${lastName}`,
        email: email,
        password: password
    };

    localStorage.setItem('userData', JSON.stringify(newUser));

    alert("Đăng ký thành công!");
    window.location.href = "login.html"; 
});