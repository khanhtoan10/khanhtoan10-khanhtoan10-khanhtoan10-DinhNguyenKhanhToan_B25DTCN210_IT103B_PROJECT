document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (email === "") {
        alert("Email không được để trống");
        return;
    }
    if (password === "") {
        alert("Mật khẩu không được để trống");
        return;
    }

    const storedData = localStorage.getItem('userData');

    if (storedData) {
        const user = JSON.parse(storedData);

        if (email === user.email && password === user.password) {
            alert("Đăng nhập thành công!");
            
            window.location.href = "../index.html"; 
            
        } else {
            alert("Cảnh báo: Email hoặc Mật khẩu không đúng!");
        }
    } else {
        alert("Tài khoản không tồn tại! Vui lòng đăng ký trước.");
    }
    window.location.href = "../index.html"; 
});