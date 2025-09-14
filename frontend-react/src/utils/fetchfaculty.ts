import { faculty_schema } from "@/models/faculty.model";
import toast from "react-hot-toast";
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const fetch_all_faculty = async () => {
    const toastId = toast.loading('Fetching Faculty List...');
    try {
        console.log("Fetching Faculty List...");
        if (localStorage.getItem('facultyList')) {
            const cachedList = localStorage.getItem('facultyList');
            if (cachedList) {
                console.log(JSON.parse(cachedList));
                console.log("Using cached faculty list");
                toast.success('Faculty List Loaded from Cache', { id: toastId });
                return JSON.parse(cachedList);
            }
        }
        const response = await fetch(`${SERVER_URL}/faculty/getall`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        const filteredFaculty = (result.data || []).filter((faculty: faculty_schema) => faculty.teacherid !== "0");
        console.log(filteredFaculty);
        localStorage.setItem('facultyList', JSON.stringify(filteredFaculty));
        toast.success('Faculty List Loaded', { id: toastId });
        return filteredFaculty;
    } catch (error) {
        console.error(':::: Faculty Data not available (SERVER ERROR) :::: ', error);
        toast.error('Failed to Load Faculty List', { id: toastId });
        return [];
    }
};