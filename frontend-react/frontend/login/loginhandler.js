// window.location = "/view/";
// document.getElementById("signin_error").style.display = "none";
let messageCounter = 0;
let display_error = (message) => {  // wrong username or password
    document.getElementById("signin_email").style.border = "2px solid #dc3545";
    document.getElementById("signin_InputPassword").style.border = "2px solid rgba(1, 106, 137, 0.827)";
    let error = document.getElementById("signin_error");
    error.innerHTML = (message || "Wrong username or password") + " *";
}
let revert_display_error = () => {  // wrong username or password revert function
    document.getElementById("signin_email").style.border = ""
    document.getElementById("signin_InputPassword").style.border = "";
    let error = document.getElementById("signin_error");
    error.innerHTML = "";
}
const login = () => {
    let email = document.getElementById("signin_email").value;
    let password = document.getElementById("signin_InputPassword").value;
    document.getElementById("message_container").innerHTML = `<div class="spinner-border text-secondary" role="status"></div>`
    fetch(`${localhost}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ name: email, password: password })
    }).then(response => {
        console.log(response.status);
        if (!response.ok) {
            if(response.status === 401) {
                throw new Error('Invalid email or password');
            }
            throw new Error('Invalid Access');
        }
        return response.json();
    }).then(data => {
        document.getElementById("message_container").innerHTML = `<div class="spinner-border" role="status" style="color:var(--brand-cyan)"></div>`
        let date = new Date();
        let date2 = new Date(date);
        date2.setDate(date2.getDate() + 2); // Set expiration to 2 days from now
        let date10 = new Date(date);
        date10.setDate(date10.getDate() + 10); // Set expiration to 10 days from now
        
        document.cookie = `accessToken=${data.data.accessToken}; path=/; SameSite=none; Secure; expires=${date2.toUTCString()}`;
        document.cookie = `refreshToken=${data.data.refreshToken}; path=/; SameSite=none; Secure; expires=${date10.toUTCString()}`;
        document.cookie = `name=${data.data.user.name}; path=/; SameSite=none; Secure; expires=${date10.toUTCString()}`;
        document.cookie = `role=${data.data.user.role}; path=/; SameSite=none; Secure; expires=${date10.toUTCString()}`;
        setTimeout(() => {  
            window.location = "/edit/";
        }, 2000);
    }).catch(error => {
        document.getElementById("message_container").innerHTML = `<div class="spinner-border" role="status" style="color:var(--brand-red)"></div>`
        if(error.message === 'Invalid email or password') {
            display_error("Invalid email or password");
        }
        else {
            display_error("Server error");
        }
        console.error('Error:', error);
        setTimeout(() => {
            document.getElementById("message_container").innerHTML = ``
        }, 3000);
    });
}
document.getElementById("login").addEventListener("click", login);
document.getElementById("signin_email").addEventListener("change", revert_display_error);
document.getElementById("signin_InputPassword").addEventListener("change", revert_display_error);
document.addEventListener('DOMContentLoaded', () => {
    if (document.cookie.includes("refreshToken") && document.cookie.includes("accessToken")) {
        window.location.href = '/edit/';
    }
});
// 4 end points(/user):-
// (POST)/login - login (body - name,password) - gives token as cookies in return
// (POST)/logout - removes already set cookies
// (POST)/refresh-token - called on access token expiry (picks refresh token from cookie) - gives new access token