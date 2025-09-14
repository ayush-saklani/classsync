export const validateEmail = (email: string) => {
    const emailRegex = /^(([^<>()[\\]\\.,;:\\s@\"]+(\\.[^<>()[\\]\\.,;:\\s@\"]+)*)|(\".+\"))@gehu\\.ac\\.in$/;
    return emailRegex.test(email);
};