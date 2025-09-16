const loader_loading = ()=>{
    let mainheading = document.createElement('h1');
    mainheading.classList.add('mx-3', 'my-3', 'heading-text');
    mainheading.innerHTML = 'Class-Sync Timetable Manager';
    document.getElementById("loader").appendChild(mainheading);
    let delay_warning = document.createElement('h5');
    delay_warning.classList.add('mx-3', 'my-3', 'heading-text');
    delay_warning.style.display = 'none';
    delay_warning.innerHTML = `Server is probably doing a cold Restart, Please Wait...`;
    document.getElementById("loader").appendChild(delay_warning);
}
loader_loading();
setTimeout(() => {
    document.getElementById("loader").childNodes[1].style.display = 'flex';
}, 6000);
