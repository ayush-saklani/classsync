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

    fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // credentials: 'include', 
        body: JSON.stringify({ name: email, password: password })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Invalid UUID');
            }
            else {
                console.log(response);
                return response.json();
            }
        })
        .then(data => {
            float_error_card_func("Login Successful", "", "success");
            console.log('==xx==');
            console.log(data.data);
            console.log('==xx==');
            // document.cookie = `refreshToken=${data.data.refreshToken};path=/edit;`;
            // document.cookie = `accessToken=${data.data.accessToken};path=/edit;`;
        })
        .catch(error => {
            float_error_card_func("Login Failed", "", "danger");
            display_error("Email or password is incorrect");
            console.error('Error:', error);
        });
}
document.getElementById("login").addEventListener("click", login);
document.getElementById("signin_email").addEventListener("change", revert_display_error);
document.getElementById("signin_InputPassword").addEventListener("change", revert_display_error);

// 4 end points(/user):-
// (POST)/login - login (body - name,password) - gives token as cookies in return
// (POST)/logout - removes already set cookies
// (POST)/refresh-token - called on access token expiry (picks refresh token from cookie) - gives new access token