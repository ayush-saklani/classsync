// this redirect the pages acording to the domain name and the path
let fileName = location.href.split("/")
console.log(fileName)
if (fileName[2] && fileName[2] == "gehutimetable.vercel.app") {
    if(fileName.length <= 3){
        window.location.href = "/view/";        // redirecting to view page automatically
    }
    else if(fileName[3] && fileName[3] == "edit"){
        window.location.href = "/view/";        // redirecting to edit page automatically
    }    
}
else if (fileName == "classsync.vercel.app") {
    if(fileName.length <= 3){
        window.location.href = "/edit/";        // redirecting to view page automatically
    }
    else if(fileName[3] && fileName[3] == "view"){
        // window.location.href = "/edit/";        // redirecting to edit page automatically
    }
}