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
export const delete_room = async (roomId: string) => {
    const toastId = toast.loading('Deleting Room...');
    console.log("Deleting Room...");
    try {
        const response = await fetch(`${SERVER_URL}/room/remove?roomid=${roomId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        toast.success('Room Deleted', { id: toastId });
        // Optionally update local cache
        const cachedList = localStorage.getItem('room_list');
        if (cachedList) {
            const updatedList = JSON.parse(cachedList).filter((room: room_schema) => room.roomid !== roomId);
            localStorage.setItem('room_list', JSON.stringify(updatedList));
        }
        return true;
    } catch (error) {
        console.error(':::: Room Data not deleted (SERVER ERROR) :::: ', error);
        toast.error('Failed to Delete Room', { id: toastId });
        return false;
    }
};
export const save_one_room = async (roomdata: room_schema) => {
    const toastId = toast.loading('Saving Room List...');
    console.log("Saving Room List...");
    try {
        const response = await fetch(`${SERVER_URL}/room/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                "roomid": roomdata.roomid,
                "name": roomdata.name,
                "type": roomdata.type,
                "capacity": roomdata.capacity,
                "schedule": roomdata.schedule,
                "allowed_course": roomdata.allowed_course
            }),
            credentials: 'include'
        });
        console.log(response);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("saved room list");
        toast.success('Room List Saved', { id: toastId });
        return true;
    } catch (error) {
        console.error(':::: Room Data not available (SERVER ERROR) :::: ', error);
        toast.error('Failed to Save Room List', { id: toastId });
        return false;
    }
};