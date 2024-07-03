// window.location = "/view/";
const delete_cookie = () => {       // logout function
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
}
const validate_cookie = (refreshToken) => {
    // let butt = document.createElement("button");
    // butt.className = "ms-auto fw-bold h4 px-4 btn btn-lg btn-danger rounded-pill float-end";
    // butt.id = "logout_button";
    // butt.innerHTML = "Logout";
    // butt.addEventListener("click", delete_cookie);
    // document.getElementsByTagName('nav')[0].appendChild(butt);
    // return;

    if(!document.cookie.includes("accessToken")){
        fetch(`https://classsync-25hj.onrender.com/user/refresh-token`, {
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
            window.location.href = '/login/';
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
        validate_cookie();
});