import toast from "react-hot-toast";
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const fetch_timetable = async (course: string, semester: string, section: string) => {
    const toastId = toast.loading('Fetching Timetable...');
    console.log("Fetching Timetable...");
    try {
        if (course == '' || semester == '' || section == '') {
            console.warn('Course, Semester, or Section not selected');
            toast.dismiss(toastId);
            return;
        }
        if (localStorage.getItem('timetableData')) {
            const cachedTimetable = localStorage.getItem('timetableData');
            if (cachedTimetable && localStorage.getItem('course') === course && localStorage.getItem('semester') === semester && localStorage.getItem('section') === section) {
                console.log("Using cached timetable data");
                toast.success('Timetable Loaded from Cache', { id: toastId });
                toast.dismiss(toastId);
                return JSON.parse(cachedTimetable);
            }
        }
        const response = await fetch(`${SERVER_URL}/table/get-timetable?` + new URLSearchParams({ course: course, semester: semester, section: section }), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        // Assuming result.data contains the timetable information
        localStorage.setItem('timetableData', JSON.stringify(result.data || null));
        localStorage.setItem('course', course);
        localStorage.setItem('semester', semester);
        localStorage.setItem('section', section);
        console.log("Timetable Data Found");
        toast.success('Timetable Loaded', { id: toastId });
        return result.data || null;
    } catch (error) {
        console.error('Error fetching timetable:', error);
        toast.error('Failed to Load Timetable', { id: toastId });
        return null;
    }
};
// setTimetableData(JSON.parse(cachedTimetable));