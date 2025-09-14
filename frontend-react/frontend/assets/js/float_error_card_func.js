//  the function below creates a floating card with the success and warning message and then removes it after 5 seconds

const float_error_card_func = (title, desc, color) => {
	const uniqueId = `float_error_card_${messageCounter++}`;
	// example of the card
	// <div class="card text-bg-danger bottom-0 end-0 me-3 mt-1 float-error-card" id="float_error_card_0"style="max-width: 20rem;">
	// 	<div class="card-header fw-bold py-1">
    //         <span>
    //             <i class="bi bi-exclamation-triangle-fill h5"></i>
    //             Message Title
    //         </span>
    //         <button class="btn float-end p-0 m-0 card-header" style="-webkit-text-stroke-width: 1px;">
    //             <i class="bi bi-x-circle h5"></i>
    //         </button>
    //         <span class="btn float-end p-0 m-0 me-2 card-header fw-bold ps-2"> 1</span>
    //     </div>
    //     <div class="card-body py-2">
    //         <p class="card-text">
    //             Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, adipisci. lorem10
    //         </p>
    //     </div>
    // </div>
	let div = document.createElement('div');
	div.className = `card text-bg-${color} bottom-0 end-0 me-3 mt-1 float-error-card`; // position-fixed
	div.style.maxWidth = "25rem";
	div.id = uniqueId;

	let headerDiv = document.createElement('div');
	headerDiv.className = "card-header fw-bold py-1";

	let headerText = document.createElement('span');
	if (color === "success") {
		headerText.innerHTML = `<i class="bi bi-check-circle-fill"></i> ${title}`;
	} else if (color === "danger") {
		headerText.innerHTML = `<i class="bi bi-exclamation-triangle-fill"></i> ${title}`;
	} else if (color === "warning") {
		headerText.innerHTML = `<i class="bi bi-exclamation-octagon-fill"></i> ${title}`;
	} else if (color === "info") {
		headerText.innerHTML = `<i class="bi bi-info-circle-fill"></i> ${title}`;
	} else if (color === "primary") {
		headerText.innerHTML = `<i class="bi bi-info-circle-fill"></i> ${title}`;
	}else{
		headerText.innerHTML = `<i class="bi bi-question-circle-fill"></i> ${title}`;
	}
	// headerText.innerHTML = `${title}`;
	headerDiv.appendChild(headerText);

	let dismissButton = document.createElement('button');
	dismissButton.className = "btn float-end p-0 m-0 card-header";
	dismissButton.style.webkitTextStrokeWidth = "1px";
	dismissButton.innerHTML = `<i class="bi bi-x-circle h5"></i>`;
	dismissButton.addEventListener('click', () => {
		div.classList.add('sink');
		setTimeout(() => {
			div.remove();
		}, 0);	// 1000
	});
	headerDiv.appendChild(dismissButton);

	let messagenumber = document.createElement('span');
	messagenumber.innerHTML = ` ${messageCounter} `;
	messagenumber.className = "btn float-end p-0 m-0 me-2 card-header fw-bold ps-2 text";
	headerDiv.appendChild(messagenumber);

	div.appendChild(headerDiv);


	let bodyDiv = document.createElement('div');
	bodyDiv.className = "card-body py-2";

	let p = document.createElement('p');
	p.className = "card-text text";
	p.innerHTML = desc;
	bodyDiv.appendChild(p);

	if(desc){
		div.appendChild(bodyDiv);
	}

	document.getElementById('message_container').appendChild(div);

	div.classList.add('rise');
	setTimeout(() => {
		div.classList.remove('rise');
		div.classList.add('sink');
		setTimeout(() => {
			div.remove();
		}, 1000);
	}, 7000);
}
// this shift the message container to the other side if mouse cursor is near the corner
// document.addEventListener('mousemove', function(event) {
//     const thresholdw = 100; // Adjusted for more reasonable corner detection
//     const thresholdh = 1000; // Adjusted for more reasonable corner detection
//     const windowWidth = window.innerWidth;
//     const windowHeight = window.innerHeight;
    
//     const bottomRightArea = {
//         x: windowWidth - thresholdw,
//         y: windowHeight - thresholdh
//     };
//     const bottomLeftArea = {
//         x: thresholdw,
//         y: windowHeight - thresholdh
//     };

//     const messageContainer = document.getElementById('message_container');

//     if (event.clientX > bottomRightArea.x && event.clientY > bottomRightArea.y) {
//         messageContainer.style.left = '0';
//         messageContainer.style.right = 'auto';
//     } else if (event.clientX < bottomLeftArea.x && event.clientY > bottomLeftArea.y) {
//         messageContainer.style.right = '0';
//         messageContainer.style.left = 'auto';
//     }
// });