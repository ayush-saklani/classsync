const fetchTimetable = async (section,course,semester) => {
    const response = await fetch(`https://class-sync-azure.azurewebsites.net/table/get-timetable?course=${course}&semester=${semester}&section=${section}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response;
}
export default fetchTimetable;