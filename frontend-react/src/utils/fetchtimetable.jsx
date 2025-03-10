import { serverhost } from "./constant";

const fetchTimetable = async(
    section = 'A1'
    , course = 'btechcse'
    , semester = '5'
) => {
    const response = await fetch(`https://class-sync-azure.azurewebsites.net/table/get-timetable?course=${course}&semester=${semester}&section=${section}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log(response)
    return response;
}
export default fetchTimetable;