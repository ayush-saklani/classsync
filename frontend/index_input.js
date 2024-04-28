document.getElementById("add_row").addEventListener("click",()=>{
    let teacher_table = document.getElementById("teacher_table").tBodies;
    teacher_table.append(teacher_table);
})
function addMoreRows(){
    for(let x=0; x<5; x++){

      var newCell = newRow.insertCell();
      newCell.innerHTML="<tr><td><input type='text' name='user_name'></td></tr>";

      newCell = newRow.insertCell();
      newCell.innerHTML="<tr><td><input type='text' name='score'></td></tr>";

      newCell = newRow.insertCell();
      newCell.innerHTML="<tr><td><input type='text' name='points'></td></tr>";

      newCell = newRow.insertCell();
      newCell.innerHTML="<tr><td><input type='text' name='total'></td></tr>";

    }
  }