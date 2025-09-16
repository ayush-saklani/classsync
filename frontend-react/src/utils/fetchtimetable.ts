import { timetable_schema } from "@/models/timetable.model";
import toast from "react-hot-toast";
import { timetable_default_schedule } from "./constant";
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
        return result.data;
    } catch (error) {
        // console.error('Error fetching timetable:', error);
        toast.error('Failed to Load Timetable', { id: toastId });
        return null;
    }
};
export const save_timetable = async (timetable: timetable_schema) => {
    const toastId = toast.loading('Saving Timetable...');
    try {
        const jsonData = {
            "course": timetable.course,
            "semester": timetable.semester,
            "section": timetable.section,
            "schedule": timetable.schedule ? timetable.schedule : timetable_default_schedule,
            "teacher_subject_data": timetable.teacher_subject_data ? timetable.teacher_subject_data : [],
        };

        const response = await fetch(`${SERVER_URL}/table/save-timetable`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(jsonData),
            credentials: 'include'
        });

        if (response.ok) {
            toast.success('Timetable Saved Successfully', { id: toastId });
            localStorage.setItem('timetableData', JSON.stringify(timetable));
            localStorage.setItem('course', timetable.course);
            localStorage.setItem('semester', timetable.semester);
            localStorage.setItem('section', timetable.section);
            return await response.json();
        } else {
            throw new Error('Failed to save timetable');
        }
    } catch (error) {
        toast.error('Failed to Save Timetable', { id: toastId });
        console.error('Error saving timetable:', error);
        return null;
    }
};
export const remove_teacher_from_section = async (teacherid: string, course: string, semester: string, section: string, subjectcode: string) => {
    const toastId = toast.loading('Removing Teacher...');
    try {
        const response = await fetch(`${SERVER_URL}/faculty/reset?` + new URLSearchParams({ course, semester, section, teacherid, subjectcode }),
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                credentials: 'include'
            }
        );

        if (!response.ok) {
            throw new Error('Failed to remove teacher due to network error');
        }

        const data = await response.json();
        console.log(data);
        toast.success('Teacher removed successfully', { id: toastId });

        return data;
    } catch (error) {
        toast.error('Failed to remove teacher', { id: toastId });
        console.error('Error removing teacher:', error);
        return null;
    }
};
export const save_timetable_editor_automation = async (timetable: timetable_schema) => {
    const toastId = toast.loading('Saving Timetable...');
    try {
        const jsonData = {
            "course": timetable.course,
            "semester": timetable.semester,
            "section": timetable.section,
            "schedule": timetable.schedule ? timetable.schedule : timetable_default_schedule,
            "teacher_subject_data": timetable.teacher_subject_data ? timetable.teacher_subject_data : [],
        };

        const response = await fetch(`${SERVER_URL}/table/save-timetable-editor-automation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(jsonData),
            credentials: 'include'
        });
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        
        if (response.ok) {
            toast.success('Timetable Saved Successfully', { id: toastId });
            return result.data;
        } else {
            throw new Error('Failed to save timetable');
        }
    } catch (error) {
        toast.error('Failed to Save Timetable', { id: toastId });
        console.error('Error saving timetable:', error);
        return null;
    }
};