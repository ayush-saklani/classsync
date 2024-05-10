// add subject and room select boxes to all the table cells  
add_select_box_to_myteacher_table();

// fetch faculty list from the server when the page loads 
fetch_faculties_list(); // fetched when the page loads initially 

// fetch Room list from the server when the page loads 
fetch_room_list();

// [ save TT JSON on DB button ]
document.getElementById("save_tt_json").addEventListener("click", save_table_func);

// [ Save on DB button ] teacher subject relation table ka listner
document.getElementById("save_sub_teacher_table").addEventListener("click", pass_second_table_to_first);

// [ + button ] add row at last when plus button is pressed 
document.getElementById("add_row").addEventListener("click", () => {add_row_func();	updateItAll();});

// [ - button ] delete row at last when plus button is pressed 
document.getElementById("delete_row").addEventListener("click", () => {delete_row_func();	updateItAll();});

//testing button to execute function on the top of page 
document.getElementById("testing").addEventListener("click", fetch_faculties_list);