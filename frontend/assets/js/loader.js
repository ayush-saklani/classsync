let mainheading = document.createElement('h1');
mainheading.classList.add('mx-3', 'my-3', 'heading-text');
mainheading.textContent = 'Class-Sync Timetable Manager';
mainheading.style.zIndex = '1000';
let delay_warning = document.createElement('h5');
delay_warning.classList.add('mx-3', 'my-3', 'heading-text');
delay_warning.style.display = 'none';
delay_warning.textContent = `Server is probably doing a cold Starting, Please Wait...`;
delay_warning.style.zIndex = '1000';
document.getElementById("loader").appendChild(mainheading);
document.getElementById("loader").appendChild(delay_warning);
setTimeout(() => {
    delay_warning.style.display = '';
}, 5000);