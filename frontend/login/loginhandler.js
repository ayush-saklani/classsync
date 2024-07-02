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

    if(email == "admin" && password == "admin"){
        document.cookie = "uuid=2117421; path=/edit ;";             //////////////temp remove this line
        float_error_card_func("Login Successful", "", "success");   //////////////temp remove this line
        setInterval(() => {                                         //////////////temp remove this line
            window.location.href = '/edit';                         //////////////temp remove this line
        }, 2000);                                                   //////////////temp remove this line
        return                                                      //////////////temp remove this line
    }else{                                                          //////////////temp remove this line                                   
        display_error("Email or password is incorrect");            //////////////temp remove this line
        return                                                      //////////////temp remove this line
    }

    fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: email, password: password })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Invalid UUID');
            }
            else {
                return response.json();
            }
        })
        .then(data => {
            document.cookie = `uuid=${data.data.uid};path=/edit ;`;
            float_error_card_func("Login Successful", "", "success");
            document.cookie = `uuid=${data.uuid};path=/edit ;`;
        })
        .catch(error => {
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