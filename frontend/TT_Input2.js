// add subject and room select boxes to all the table cells  
add_select_box_to_myteacher_table();

// fetch faculty list from the server when the page loads 
fetch_faculties_list(); // fetched when the page loads initially 

// fetch Room list from the server when the page loads 
fetch_room_list();

// [ save TT JSON on DB button ]
document.getElementById("save_tt_json").addEventListener("click", fetch_room_list);

// [ Save on DB button ] teacher subject relation table ka listner
document.getElementById("save_sub_teacher_table").addEventListener("click", save_sub_teacher_table_func);

// [ + button ] add row when plus button is pressed 
document.getElementById("add_row").addEventListener("click", () => {add_row_func();	updateItAll();});

//testing button to execute function on the top of page 
document.getElementById("testing").addEventListener("click", fetch_faculties_list);