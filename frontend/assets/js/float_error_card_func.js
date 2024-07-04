//  the function below creates a floating card with the success and warning message and then removes it after 5 seconds

const float_error_card_func = (title, desc, color) => {
	const uniqueId = `float_error_card_${messageCounter++}`;

	let div = document.createElement('div');
	div.className = `card text-bg-${color} bottom-0 end-0 me-3 mt-1 float-error-card`; // position-fixed
	div.style.maxWidth = "25rem";
	div.id = uniqueId;

	let headerDiv = document.createElement('div');
	headerDiv.className = "card-header fw-bold";
	div.appendChild(headerDiv);

	let headerText = document.createElement('span');
	headerDiv.appendChild(headerText);

	let dismissButton = document.createElement('button');
	dismissButton.innerHTML = `<i class="bi bi-x-circle h5"></i>`;
	dismissButton.style.webkitTextStrokeWidth = "1px";
	dismissButton.className = "btn float-end p-0 m-0 card-header";
	dismissButton.addEventListener('click', () => {
		div.classList.add('sink');
		setTimeout(() => {
			div.remove();
		}, 0);	// 1000
	});
	headerDiv.appendChild(dismissButton);

	let messagenumber = document.createElement('span');
	messagenumber.innerHTML = ` ${messageCounter} `;
	messagenumber.className = "btn float-end p-0 m-0 me-2 card-header fw-bold";
	headerDiv.appendChild(messagenumber);

	let bodyDiv = document.createElement('div');
	bodyDiv.className = "card-body";

	let h5 = document.createElement('h5');
	h5.className = "card-title";
	h5.innerHTML = title;
	bodyDiv.appendChild(h5);

	let p = document.createElement('p');
	p.className = "card-text";
	p.innerHTML = desc;
	bodyDiv.appendChild(p);

	div.appendChild(bodyDiv);
	document.getElementById('message_container').appendChild(div);

	if (color === "success") {
		headerText.innerHTML = `Success <i class="bi bi-check-circle-fill"></i>`;
	} else if (color === "danger") {
		headerText.innerHTML = `Warning <i class="bi bi-exclamation-triangle-fill"></i>`;
	} else if (color === "warning") {
		headerText.innerHTML = `Warning <i class="bi bi-exclamation-octagon-fill"></i>`;
	} else if (color === "info") {
		headerText.innerHTML = `Info <i class="bi bi-info-circle-fill"></i>`;
	} else if (color === "primary") {
		headerText.innerHTML = `Info <i class="bi bi-info-circle-fill"></i>`;
	}
	div.classList.add('rise');
	setTimeout(() => {
		div.classList.remove('rise');
		div.classList.add('sink');
		setTimeout(() => {
			div.remove();
		}, 1000);
	}, 7000);
}
document.addEventListener('mousemove', function(event) {
    const thresholdw = 100; // Adjusted for more reasonable corner detection
    const thresholdh = 1000; // Adjusted for more reasonable corner detection
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    const bottomRightArea = {
        x: windowWidth - thresholdw,
        y: windowHeight - thresholdh
    };
    const bottomLeftArea = {
        x: thresholdw,
        y: windowHeight - thresholdh
    };

    const messageContainer = document.getElementById('message_container');

    if (event.clientX > bottomRightArea.x && event.clientY > bottomRightArea.y) {
        messageContainer.style.left = '0';
        messageContainer.style.right = 'auto';
    } else if (event.clientX < bottomLeftArea.x && event.clientY > bottomLeftArea.y) {
        messageContainer.style.right = '0';
        messageContainer.style.left = 'auto';
    }
});