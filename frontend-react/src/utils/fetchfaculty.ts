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
export const update_faculty = async (id: string, name: string) => {
    id = id.trim();
    name = name.trim();
    const toastId = toast.loading('Updating Faculty...');
    if (id === "0") {
        toast.error('ID 0 is reserved for Admin. Please use a different ID.', { id: toastId });
        return false;
    }
    if (id === "" || name === "") {
        toast.error('Please fill all the fields before saving the data (ID and Name are required)', { id: toastId });
        return false;
    }
    try {
        // Remove faculty first
        const removeResponse = await fetch(`${SERVER_URL}/faculty/remove?teacherid=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        if (!removeResponse.ok) {
            throw new Error(`Failed to remove faculty. HTTP status: ${removeResponse.status}`);
        }
        await removeResponse.json();

        // Add faculty with new name
        const addResponse = await fetch(`${SERVER_URL}/faculty/add?teacherid=${id}&name=${encodeURIComponent(name)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        if (addResponse.status === 403) {
            throw new Error('Faculty not added. This ID already exists, please use a different ID.');
        }
        if (!addResponse.ok) {
            throw new Error(`Failed to add faculty. HTTP status: ${addResponse.status}`);
        }
        await addResponse.json();

        // Optionally update local cache
        const cachedList = localStorage.getItem('facultyList');
        if (cachedList) {
            let facultyList: faculty_schema[] = JSON.parse(cachedList);
            facultyList = facultyList.filter(faculty => faculty.teacherid !== id);
            facultyList.push({ teacherid: id, name });
            localStorage.setItem('facultyList', JSON.stringify(facultyList));
        }

        toast.success('Faculty data updated successfully', { id: toastId });
        return true;
    } catch (error: any) {
        toast.error(error.message || 'Failed to update faculty', { id: toastId });
        console.error('::::: ERROR UPDATING FACULTY :::::', error);
        return false;
    }
};
