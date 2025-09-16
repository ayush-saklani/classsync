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
export const add_faculty = async (id: string, name: string) => {
    id = id.trim();
    name = name.trim();
    const toastId = toast.loading('Adding Faculty...');
    if (id === "0") {
        toast.error('ID 0 is reserved for Admin. Please use a different ID.', { id: toastId });
        return false;
    }
    if (id === "" || name === "") {
        toast.error('Please fill all the fields before saving the data (ID and Name are required)', { id: toastId });
        return false;
    }
    try {
        const response = await fetch(`${SERVER_URL}/faculty/add?teacherid=${id}&name=${encodeURIComponent(name)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        if (response.status === 403) {
            throw new Error('Faculty not added. This ID already exists, please use a different ID.');
        }
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const parsedData = await response.json();
        toast.success('Faculty Added Successfully', { id: toastId });
        return true;
    } catch (error: any) {
        toast.error(error.message || 'Failed to Add Faculty', { id: toastId });
        console.error('::::: ERROR ADDING DATA :::::', error);
        return false;
    }
};
export const remove_faculty = async (id: string) => {
    id = id.trim();
    const toastId = toast.loading('Removing Faculty...');
    if (id === "0") {
        toast.error('ID 0 is reserved for Admin. Please use a different ID.', { id: toastId });
        return false;
    }
    if (id === "") {
        toast.error('Please provide a valid Faculty ID.', { id: toastId });
        return false;
    }
    try {
        const response = await fetch(`${SERVER_URL}/faculty/remove?teacherid=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        await response.json();
        toast.success(`Faculty with ID: ${id} removed successfully`, { id: toastId });
        // Optionally update local cache
        const cachedList = localStorage.getItem('facultyList');
        if (cachedList) {
            const facultyList = JSON.parse(cachedList).filter((faculty: faculty_schema) => faculty.teacherid !== id);
            localStorage.setItem('facultyList', JSON.stringify(facultyList));
        }
        return true;
    } catch (error: any) {
        toast.error(error.message || 'Failed to Remove Faculty', { id: toastId });
        console.error('::::: ERROR REMOVING DATA :::::', error);
        return false;
    }
};
export const update_one_faculty = async (faculty: { teacherid: string; name: string; schedule: any }) => {
    const toastId = toast.loading('Updating Faculty...');
    if (!faculty || !faculty.teacherid || !faculty.name) {
        toast.error('Faculty data is incomplete.', { id: toastId });
        return false;
    }
    try {
        const response = await fetch(`${SERVER_URL}/faculty/updateOne`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(faculty)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        await response.json();

        // Optionally update local cache if needed
        const cachedList = localStorage.getItem('facultyList');
        if (cachedList) {
            let facultyCache: faculty_schema[] = JSON.parse(cachedList);
            facultyCache = facultyCache.map(f =>
                f.teacherid === faculty.teacherid
                    ? { ...f, name: faculty.name, schedule: faculty.schedule }
                    : f
            );
            localStorage.setItem('facultyList', JSON.stringify(facultyCache));
        }

        toast.success('Faculty updated successfully', { id: toastId });
        return true;
    } catch (error: any) {
        toast.error(error.message || 'Failed to update faculty', { id: toastId });
        console.error('::::: ERROR UPDATING FACULTY :::::', error);
        return false;
    }
};
export const save_faculty_list = async (faculty_data: faculty_schema[]) => {
    const toastId = toast.loading('Updating Faculty List...');
    try {
        const response = await fetch(`${SERVER_URL}/faculty/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ facultyList: faculty_data })
        });
        if (!response.ok) {
            throw new Error('Data not saved due to network error');
        }
        await response.json();

        // Update local cache
        localStorage.setItem('facultyList', JSON.stringify(faculty_data));

        toast.success('Faculty Data Reset Complete', { id: toastId });
        return true;
    } catch (error: any) {
        toast.error('Faculty Data Reset Incomplete. Server Error', { id: toastId });
        console.error('Faculty Data Not Updated [SERVER ERROR]:', error);
        return false;
    }
};
