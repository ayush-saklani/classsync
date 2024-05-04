
// document.getElementById('go').addEventListener('click', () => {
//     let course = document.getElementById("course_option").value;
//     let semester = document.getElementById("semester_option").value;
//     let section = document.getElementById("section_option").value.toLowerCase();
    
//     let query = { "course":course, "semester":semester, "section":section } 
//     console.log(a);

//     fetch('http://127.0.0.1:3000/getCoordinates', {
//         method: 'POST',
//         headers:{
//             'Content-Type': 'application/json'
//         },
//         body: query
//     })
//     .then(response => response.json())
//     .then(data => {
//         points = data;
//         console.log(points); // Coordinates received from the server
//     })
//     .catch(error => console.error('out of service.. ~_~  @_@ (O 3 O):', error));
// });
// document.getElementById('-1').addEventListener('click', () => {
//     fetch('./mapgeoJSON/floor-1.geojson').then(response =>  response.json()).then(data => {
//         L.geoJSON(data, {
//             style:{color: 'cadetblue',weight: 1,opacity: 1},
//         }).addTo(map);
//     }).catch(error => console.error('out of service.. ~_~  @_@', error));   
// });