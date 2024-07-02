// window.location = "/view/";
const delete_cookie = () => {       // logout function
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
const validate_cookie = (refreshToken) => {
    let butt = document.createElement("button");                             /////////////////////  temp remove this line
    butt.className = "ms-auto fw-bold h4 px-4 btn btn-lg btn-danger rounded-pill float-end";   /////////////////////  temp remove this line
    butt.id = "logout_button";                                               /////////////////////  temp remove this line
    butt.innerHTML = "Logout";                                               /////////////////////  temp remove this line
    butt.addEventListener("click", delete_cookie);                           /////////////////////  temp remove this line
    document.getElementsByTagName('nav')[0].appendChild(butt);
    return                                                                   /////////////////////  temp remove this line           
    if(!document.cookie.includes("accessToken")){
        fetch('http://localhost:3000/user/refresh-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error in fetching new access token');
            }
            return response.json();
        })
        .then(() => {
            let butt = document.createElement("button");
            butt.className = "ms-auto fw-bold h4 px-4 btn btn-lg btn-danger rounded-pill float-end";
            butt.id = "logout_button";
            butt.innerHTML = "Logout";
            butt.addEventListener("click", delete_cookie);
            document.getElementsByTagName('nav')[0].appendChild(butt);        
        })
        .catch(error => {
            display_error("Email or password is incorrect");
            console.error('Error:', error);
        });
    }
    else{
        let butt = document.createElement("button");
        butt.className = "ms-auto fw-bold h4 px-4 btn btn-lg btn-danger rounded-pill float-end";
        butt.id = "logout_button";
        butt.innerHTML = "Logout";
        butt.addEventListener("click", delete_cookie);
        document.getElementsByTagName('nav')[0].appendChild(butt);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    if (document.cookie.includes("refreshToken")) {
        validate_cookie(document.cookie.split(";").find(ele => ele.trim().startsWith("refreshToken")).split("=")[1]);
    }
    else {
        window.location.href = '/login';
    }
});