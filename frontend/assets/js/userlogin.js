// window.location = "/view/";
const delete_cookie = () => {       // logout function
    document.cookie = "uuid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/edit ;";
    window.location.reload();
}
const validate_cookie = (sessionId) => {
    let butt = document.createElement("button");                             /////////////////////  temp remove this line
    butt.className = "fw-bold h4 px-4 btn btn-lg btn-danger rounded-pill";   /////////////////////  temp remove this line
    butt.id = "logout_button";                                               /////////////////////  temp remove this line
    butt.innerHTML = "Logout";                                               /////////////////////  temp remove this line
    butt.addEventListener("click", delete_cookie);                           /////////////////////  temp remove this line
    document.getElementById("login_button").replaceWith(butt);               /////////////////////  temp remove this line
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
document.addEventListener('DOMContentLoaded', ()=>{
    if (document.cookie.includes("uuid=")) {
        validate_cookie(document.cookie.split("=")[1]);
    }
    else{
        window.location.href = '/login';
    }
});