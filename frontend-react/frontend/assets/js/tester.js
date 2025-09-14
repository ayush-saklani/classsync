const validateEmail = (email) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@gehu\.ac\.in$/;
    return emailRegex.test(email);
}
if (validateEmail("exampale121212@gehu.ac.in")) {
    console.log("Valid email address");
} else {
    console.log("Invalid email address");
}