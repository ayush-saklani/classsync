const createFooter = () => {
	const footer = document.createElement('div');
	footer.className = "container pt-md-5 px-4 px-md-3 text-body-secondary";
	footer.innerHTML = `
        <a class="d-inline-flex align-items-center mb-2 text-body-emphasis text-decoration-none" href="/">
				<img src="/assets/image/logo.png" height="75px" class="d-inline-block align-text-top">
				<h2 class="my-3 heading-text fs-5 mx-2">Class-Sync Timetable Manager</h2>
			</a>
			<ul class="list-unstyled small">
				<li class="text mb-2">Designed and built with all the love and passion in the world by <a
						class="link-danger" href="https://github.com/ayush-saklani"><b>ayush-saklani</b></a> <b>X</b> <a
						class="link-primary" href="https://github.com/RawatDevanshu"><b>RawatDevanshu</b></a>.</li>
				<li class="text mb-2">Currently v1.8.0.</li>
			</ul>
			<ul class="h4 list-unstyled d-flex">
				<a target="_blank" href="https://www.linkedin.com/in/devanshurawat/" class="mx-1"><i
						class="bi bi-linkedin text text-primary"></i></a>
				<a target="_blank" href="https://github.com/RawatDevanshu" class="mx-1"><i
						class="bi bi-github text text-primary"></i></a>
				<p class="mx-2"> <b> X </b> </p>
				<a target="_blank" href="https://www.linkedin.com/in/ayush-saklani/" class="mx-1"><i
						class="bi bi-linkedin text text-danger"></i></a>
				<a target="_blank" href="https://github.com/ayush-saklani" class="mx-1"><i
						class="bi bi-github text text-danger"></i></a>
			</ul>
    	`;
	document.getElementsByTagName('footer')[0].appendChild(footer);
}
createFooter();