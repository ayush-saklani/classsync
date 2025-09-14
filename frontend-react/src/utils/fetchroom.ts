import { room_schema } from "@/models/room.model";
import toast from "react-hot-toast";
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const fetch_all_rooms = async () => {
    const toastId = toast.loading('Fetching Room List...');
    console.log("Fetching Room List...");
    try {
        if (localStorage.getItem('room_list')) {
            const cachedList = localStorage.getItem('room_list');
            if (cachedList) {
                console.log(JSON.parse(cachedList));
                console.log("Using cached room list");
                toast.success('Room List Loaded from Cache', { id: toastId });
                return JSON.parse(cachedList);
            }
        }
        const response = await fetch(`${SERVER_URL}/room/getall`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Room Data Found");
        localStorage.setItem('room_list', JSON.stringify(result.data || []));
        toast.success('Room List Loaded', { id: toastId });
        return result.data || [];
    } catch (error) {
        console.error(':::: Room Data not available (SERVER ERROR) :::: ', error);
        toast.error('Failed to Load Room List', { id: toastId });
        return [];
    }
};
export const save_all_rooms = async (room_list: room_schema[]) => {
    const toastId = toast.loading('Saving Room List...');
    console.log("Saving Room List...");
    try {
        const response = await fetch(`${SERVER_URL}/room/savemultiple`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                "type": "faculties",
                "data": room_list
            }),
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("saving room list");
        toast.success('Room List Saved', { id: toastId });
        localStorage.setItem('room_list', JSON.stringify(room_list));
        return;
    } catch (error) {
        console.error(':::: Room Data not available (SERVER ERROR) :::: ', error);
        toast.error('Failed to Save Room List', { id: toastId });
        return;
    }
};