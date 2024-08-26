import axios from "axios";
import appConfig from "../Utils/Config";
import { serverType } from "../types/serverType";

export async function fetchAllServers(): Promise<serverType[] | void> {
    try {
        const res = await axios.get<serverType[]>(appConfig.serversUrl);
        return res.data;
    } catch (error) {
        console.log(error);
        alert("Some error occurred. Sorry, please try again later.");
    }
}

export async function updateStatus(id: number, newValue: boolean): Promise<void> {
    try {
        const res = await axios.post(`${appConfig.serversUrl}/${id}`, { newValue }); 
        if (res.status !== 200) {
            console.log(res);
            throw new Error("Update returned with wrong status");
        }
    } catch (error) {
        console.log(error);
        alert("Some error occurred. Sorry, please try again later.");
    }
}