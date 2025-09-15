import { room_schema } from "@/models/room.model";
import toast from "react-hot-toast";
import { generic_data_default } from "./constant";
import { subjectTable_schema } from "@/models/subjecttable.model";
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const fetch_generic_table_data = async (course: string, semester: string) => {
    const toastId = toast.loading('Fetching Course Data...');
    try {
        const response = await fetch(`${SERVER_URL}/subjecttable/get?course=${course}&semester=${semester}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        const data = result.data;
        console.log(data);
        toast.success('Course Data Fetched Successfully', { id: toastId });
        return data;
    } catch (error) {
        console.error('::::: ERROR FETCHING COURSE DATA :::::', error);
        toast.error('Failed to Fetch Course Data', { id: toastId });
        return { ...generic_data_default, course, semester };
    }
};

export const save_generic_table_data = async (generic_table_data: subjectTable_schema) => {
    const toastId = toast.loading('Saving Course Data...');
    try {
        const response = await fetch(`${SERVER_URL}/subjecttable/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                course: generic_table_data.course,
                semester: generic_table_data.semester,
                teacher_subject_data: generic_table_data.teacher_subject_data
            }),
            credentials: 'include'
        });
        console.log(response);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        toast.success('Course Data Saved Successfully', { id: toastId });
        return result;
    } catch (error) {
        console.error('::::: ERROR SAVING COURSE DATA :::::', error);
        toast.error('Failed to Save Course Data', { id: toastId });
        return null;
    }
};
export const set_generic_data_for_all = async (course: string, semester: string) => {
    const toastId = toast.loading('Setting data for all courses and semesters...');
    try {
        const response = await fetch(`${SERVER_URL}/subjecttable/update?course=${course}&semester=${semester}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('::::: DATA NOT SAVED DUE TO NETWORK ERROR :::::');
        }
        await response.json();
        toast.success('Data Set for all Successfully', { id: toastId });
        return true;
    } catch (error) {
        toast.error('Data Set for all Failed', { id: toastId });
        console.error('::::: ERROR RESETTING DATA :::::', error);
        return false;
    }
};