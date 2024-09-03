const fetchtimetable = async () => {
    let resposedata;
    await fetch(`https://class-sync-azure.azurewebsites.net/table/get-timetable?course=btechcse&semester=5&section=A1 `, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error(':::: Room Data not available (SERVER ERROR) ::::');
        }else{
            return response.json();
        }
    }).then(data => {
        data = data.data
        console.log(data);
        resposedata = data;
        // return data;
    }).catch(error => {
        console.error('Data unavailable:', error)
    });
    // a = a.data;
    console.log(resposedata);
    return resposedata;
}
export default fetchtimetable;