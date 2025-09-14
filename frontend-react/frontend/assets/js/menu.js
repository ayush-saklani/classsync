const createHeader = () => {
	const menu = document.createElement('div');
	menu.className = "container text-body-secondary";
	menu.innerHTML = `
        <div class="menu float-end mt-2 mx-2" id="sidebar">
        	<div class="item">
        	    <a class="link text fw-bold"><span class="text-dar">Direct Links <i class="bi bi-list" style="-webkit-text-stroke-width: 1px;"></i></span></a>
        	    <div class="submenu">
        	        <div class="submenu-item"><a href="/edit/timetable-editor/" class="submenu-link text fw-bold"> Editor <i class="bi bi-pencil-fill"></i></a></div>
        	        <div class="submenu-item"><a href="/edit/subject-data-editor/" class="submenu-link text fw-bold"> Set Subject <i class="bi bi-book" style="-webkit-text-stroke-width: 1px;"></i> </a></div>
        	        <div class="submenu-item"><a href="/edit/faculty-data-editor/" class="submenu-link text fw-bold"> Edit Faculty <i class="bi bi-person-fill-add"></i> </a></div>
        	        <div class="submenu-item"><a href="/edit/faculty-data-set/" class="submenu-link text fw-bold"> Set Faculty  <i class="bi bi-person-fill"></i> </a></div>
        	        <div class="submenu-item"><a href="/edit/misc/" class="submenu-link text fw-bold"> Misc <i class="bi bi-xbox"></i> </a></div>
        	        <div class="submenu-item"><a href="/edit/reset/" class="submenu-link text fw-bold"> Reset <i class="bi bi-exclamation-triangle-fill"></i> </a></div>
        	    </div>
        	</div>
    	</div>`;
	document.getElementsByTagName('nav')[0].insertAdjacentElement('afterend', menu);
}
createHeader();