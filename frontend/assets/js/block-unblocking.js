const blocking = () => {
    let buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = true;
    });
    let inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.disabled = true;
    });
    let selects = document.querySelectorAll('select');
    selects.forEach(select => {
        select.disabled = true;
    });
}
const unblocking = () => {
    let buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = false;
    });
    let inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.disabled = false;
    });
    let selects = document.querySelectorAll('select');
    selects.forEach(select => {
        select.disabled = false;
    });
}