// window.location = "/view/";
const delete_cookie = () => {       // logout function
    fetch('http://localhost:3000/logindata/login_uuid_validate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sessionId })
    })
}
const validate_cookie = (sessionId) => {
    let butt = document.createElement("button");                             /////////////////////  temp remove this line
    butt.className = "ms-auto fw-bold h4 px-4 btn btn-lg btn-danger rounded-pill float-end";   /////////////////////  temp remove this line
    butt.id = "logout_button";                                               /////////////////////  temp remove this line
    butt.innerHTML = "Logout";                                               /////////////////////  temp remove this line
    butt.addEventListener("click", delete_cookie);                           /////////////////////  temp remove this line
    document.getElementsByTagName('nav')[0].appendChild(butt);
    return                                                                   /////////////////////  temp remove this line           
       
    fetch('http://localhost:3000/logindata/login_uuid_validate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sessionId })
    })
        .then(response => {
            if (response.ok) {
                let butt = document.createElement("button");
                butt.className = "fw-bold h4 px-4 btn btn-lg btn-danger rounded-pill";
                butt.id = "logout_button";
                butt.innerHTML = "Logout";
                butt.addEventListener("click", delete_cookie);
                document.getElementById("login_button").replaceWith(butt);

                console.log('Session is valid' + response.json());      // Session is valid, continue with user interactions
                float_error_card_function("Session is valid", "bg-success");
            }
            else {
                document.cookie = "uuid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/edit ;";   //uncomment this line
                window.location.href = '/login';                                             //uncomment this line
                throw new Error('Session validation failed');   // Session is invalid, handle accordingly (e.g., redirect to login)
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
// this is the code for the login button currently not in use and logout button is inserted if cookie is there else redirected to login page
// const addLoginButton = () => {
//     let butt = document.createElement("button");
//     butt.className = "ms-auto fw-bold h4 px-4 btn btn-lg btn-secondary rounded-pill float-end";
//     butt.id = "login_button";
//     butt.innerHTML = "Login";
//     butt.addEventListener("click", () => {
//         window.location.href = '/login';
//     });
//     document.getElementsByTagName('nav')[0].appendChild(butt);
// }
// addLoginButton();
document.addEventListener('DOMContentLoaded', ()=>{
    if (document.cookie.includes("uuid=")) {
        validate_cookie(document.cookie.split("=")[1]);
    }
    else{
        // window.location.href = '/login';
    }
});