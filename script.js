// Get DOM elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Password visibility toggle
togglePasswordBtn.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Toggle eye icon
    const eyeIcon = this.querySelector('.eye-icon');
    eyeIcon.textContent = type === 'password' ? '👁️' : '🙈';
});

// Email validation
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Password validation (minimum 6 characters)
function validatePassword(password) {
    return password.length >= 6;
}

// Real-time email validation
emailInput.addEventListener('blur', function() {
    const email = this.value.trim();
    
    if (email === '') {
        emailError.textContent = '';
        emailInput.classList.remove('invalid', 'valid');
        return;
    }
    
    if (!validateEmail(email)) {
        emailError.textContent = 'Please enter a valid email address';
        emailInput.classList.add('invalid');
        emailInput.classList.remove('valid');
    } else {
        emailError.textContent = '';
        emailInput.classList.remove('invalid');
        emailInput.classList.add('valid');
    }
});

// Real-time password validation
passwordInput.addEventListener('blur', function() {
    const password = this.value;
    
    if (password === '') {
        passwordError.textContent = '';
        passwordInput.classList.remove('invalid', 'valid');
        return;
    }
    
    if (!validatePassword(password)) {
        passwordError.textContent = 'Password must be at least 6 characters';
        passwordInput.classList.add('invalid');
        passwordInput.classList.remove('valid');
    } else {
        passwordError.textContent = '';
        passwordInput.classList.remove('invalid');
        passwordInput.classList.add('valid');
    }
});

// Clear error on input
emailInput.addEventListener('input', function() {
    if (emailError.textContent) {
        emailError.textContent = '';
        emailInput.classList.remove('invalid');
    }
});

passwordInput.addEventListener('input', function() {
    if (passwordError.textContent) {
        passwordError.textContent = '';
        passwordInput.classList.remove('invalid');
    }
});

// Form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    let isValid = true;
    
    // Validate email
    if (email === '') {
        emailError.textContent = 'Email is required';
        emailInput.classList.add('invalid');
        isValid = false;
    } else if (!validateEmail(email)) {
        emailError.textContent = 'Please enter a valid email address';
        emailInput.classList.add('invalid');
        isValid = false;
    } else {
        emailError.textContent = '';
        emailInput.classList.remove('invalid');
        emailInput.classList.add('valid');
    }
    
    // Validate password
    if (password === '') {
        passwordError.textContent = 'Password is required';
        passwordInput.classList.add('invalid');
        isValid = false;
    } else if (!validatePassword(password)) {
        passwordError.textContent = 'Password must be at least 6 characters';
        passwordInput.classList.add('invalid');
        isValid = false;
    } else {
        passwordError.textContent = '';
        passwordInput.classList.remove('invalid');
        passwordInput.classList.add('valid');
    }
    
    // If validation passes, show success message
    if (isValid) {
        alert('Login successful! ✅\n\nEmail: ' + email);
        // In a real application, you would send the data to a server here
        loginForm.reset();
        emailInput.classList.remove('valid');
        passwordInput.classList.remove('valid');
    }
});
