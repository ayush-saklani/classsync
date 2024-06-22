// window.location = "/view/";
if (document.cookie.includes("uuid=")) {
    // if(uuid is NOT correct then){    // uuid checker fucntion here
    //     window.location = "/login/";
    // }
    // else{
    
        let img = document.createElement("img");
        img.src = "/assets/image/defaultavatar.png";
        img.className = "rounded-circle btn btn-lg p-0 m-2";
        img.id = "profile_img";
        document.getElementById("login_status").replaceWith(img);
    
    // }
}
else{
    window.location = "/login/";
}