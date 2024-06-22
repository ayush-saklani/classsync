// window.location = "/view/";
const delete_cookie = () => {       // logout function
    document.cookie = "uuid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
}
if (document.cookie.includes("uuid=")) {
    // if(uuid is NOT correct then){    window.location = "/login/";}
    //  else 
    let butt = document.createElement("button");
    butt.className = "fw-bold h4 px-4 btn btn-lg btn-danger rounded-pill";
    butt.id = "logout_button";
    butt.innerHTML = "Logout";
    butt.addEventListener("click", delete_cookie);
    document.getElementById("login_button").replaceWith(butt);
}
else {
    // window.location = "/login/"; 
}