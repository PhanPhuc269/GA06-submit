document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rePassword = document.getElementById('re-password').value;
            const errorMessage = document.getElementById('error-message');
            const passwordHelp = document.getElementById('passwordHelp');
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

            if (!username || !email || !password || !rePassword) {
                event.preventDefault(); // Ngăn chặn form gửi đi
                errorMessage.textContent = 'All fields are required!';
            } else if (!regex.test(password)) {
                event.preventDefault();
                passwordHelp.style.color = 'red';
                passwordHelp.textContent = 'Password does not meet the complexity requirements.';
            } else if (regex.test(password)) {
                passwordHelp.style.color = 'green';
                passwordHelp.textContent = 'Password meets the complexity requirements.';
            }else if (password !== rePassword) {
                event.preventDefault(); // Ngăn chặn form gửi đi
                errorMessage.textContent = 'Passwords do not match!';
            } else {
                errorMessage.textContent = ''; // Xóa thông báo lỗi nếu tất cả các trường đều hợp lệ
            }
        });
    }
    
});

async function handleRegister(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rePassword = document.getElementById('re-password').value;
    const errorMessage = document.getElementById('error-message');
    const passwordHelp = document.getElementById('passwordHelp');
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (password !== rePassword) {
        errorMessage.textContent = 'Passwords do not match';
        return;
    }
     if (!username || !email || !password || !rePassword) {
        errorMessage.textContent = 'All fields are required!';
        return;
    }
    if (!regex.test(password)) {
        passwordHelp.style.color = 'red';
        passwordHelp.textContent = 'Password does not meet the complexity requirements.';
        return;
    } else if (regex.test(password)) {
        passwordHelp.style.color = 'green';
        passwordHelp.textContent = 'Password meets the complexity requirements.';
    }
    if (password !== rePassword) {
        errorMessage.textContent = 'Passwords do not match!';
        return;
    } else {
        errorMessage.textContent = ''; // Xóa thông báo lỗi nếu tất cả các trường đều hợp lệ
    }

    const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password, rePassword })
    });

    const result = await response.json();

    if (response.status === 400) {
        errorMessage.textContent = result.message;
    } else if (response.status === 201) {
        window.location.href = '/verify'; // Redirect to success page
    } else {
        errorMessage.textContent = 'An unexpected error occurred';
    }
}