let arr = ["08","12"];			// bus arrival time
let dep = ["01","04","06"];		// bus departure time
const bus_arrival = ()=> {
	let row = document.getElementById("mytable").rows[0]
	for(let i=1; i<=10; i++){
		let cell = row.cells[i].innerText.split("-");
		if(arr.includes(cell[0])){
			row.cells[i].classList.add("bus-arr");
		}if(dep.includes(cell[1])){
			row.cells[i].classList.add("bus-dep");
		}
	}
}
bus_arrival();