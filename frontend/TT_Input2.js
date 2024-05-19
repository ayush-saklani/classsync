add_select_box_to_mytable();    // add subject and room select boxes to all the table cells  
fetch_faculties_list();                 // fetch faculty list from the server when the page loads 
// fetch_room_list();                      // fetch Room list from the server when the page loads 

// [ save TT JSON on DB button ]
document.getElementById("save_tt_json").addEventListener("click", save_table_func);
// document.getElementById("showit").addEventListener("click",fetch_timetable); // button is not needed for now below change listner are used instead

// [ Save on DB button ] teacher subject relation table ka listner
document.getElementById("save_sub_teacher_table").addEventListener("click", pass_second_table_to_first);

//testing button to execute function on the top of page 
document.getElementById('course_option').addEventListener('change', fetch_timetable);
document.getElementById('semester_option').addEventListener('change', fetch_timetable);
document.getElementById('section_option').addEventListener('change', fetch_timetable);
