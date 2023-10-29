function checkPasswordStrength(password) {
    let strength = 0;
    const length = password.length;

    if (length >= 8) {
        strength += 1;
    }

    if (length >= 12) {
        strength += 1;
    }

    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
        strength += 1;
    }

    if (/\d/.test(password)) {
        strength += 1;
    }

    if (/\W/.test(password)) {
        strength += 1;
    }

    displayStrength(strength);
}

function displayStrength(strength) {
    const strengthText = document.getElementById("strength");
    const strengthTextValue = ["Very Weak", "Weak", "Moderate", "Strong", "Very Strong"];
    const strengthColor = ["red", "orange", "yellow", "green", "darkgreen"];
    strengthText.innerHTML = strengthTextValue[strength];
    strengthText.style.color = strengthColor[strength];
}

const validUsers = [
    { username: "user1", password: "password1" },
    { username: "user2", password: "password2" },
    { username: "sameer.katti20@pccoepune.org", password: "sameer1" }
    // Add more users as needed
];

const loginForm = document.getElementById("login-form");
const loginStatus = document.getElementById("login-status");
let failedLoginAttempts = 0; // Track failed login attempts
const maxFailedAttempts = 5; // Set a maximum number of failed attempts
const loginCooldown = 45; // Set the login cooldown time in seconds

let cooldownInterval; // Variable to store the interval ID

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;

    // Check if the input matches any of the valid users
    const validUser = validUsers.find((user) => user.username === usernameInput && user.password === passwordInput);

    if (validUser) {
        loginStatus.innerHTML = "Login successful!";
        loginStatus.style.color = "green";
        // If login is successful, reset failed login attempts and the timer
        failedLoginAttempts = 0;
        clearInterval(cooldownInterval);
        loginForm.reset();
        loginForm.removeAttribute("disabled");
    } else {
        failedLoginAttempts++;
        loginStatus.innerHTML = "Invalid username or password. Attempt " + failedLoginAttempts + " of " + maxFailedAttempts + ".";

        if (failedLoginAttempts >= maxFailedAttempts) {
            loginStatus.innerHTML = "Too many failed attempts. Please try again in " + loginCooldown + " seconds.";
            loginStatus.style.color = "red";
            loginForm.setAttribute("disabled", true);
            startCooldownTimer();
        }
    }
});

function startCooldownTimer() {
    let remainingTime = loginCooldown;

    cooldownInterval = setInterval(function () {
        if (remainingTime === 0) {
            clearInterval(cooldownInterval);
            loginStatus.innerHTML = "You can now attempt to log in again.";
            loginStatus.style.color = "green";
            loginForm.removeAttribute("disabled");
        } else {
            loginStatus.innerHTML = "Too many failed attempts. Please try again in " + remainingTime + " seconds.";
            remainingTime--;
        }
    }, 1000); // Update the timer every second
}
const generatedOTP = generateRandomOTP();
storeOTPInDatabase(userEmail, generatedOTP);

if (userEmailIsVerified) {
    // Email is verified
    const enteredOTP = prompt("Please enter the OTP sent to your email:");
    
    // Validate the entered OTP against the stored OTP.
    if (enteredOTP === storedOTP) {
        alert("OTP verification successful. You are now logged in.");
    } else {
        alert("Invalid OTP. Please try again.");
    }
} else {
    alert("Please verify your email address before logging in.");
}










