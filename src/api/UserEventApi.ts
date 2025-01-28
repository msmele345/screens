import axios, { AxiosResponse } from "axios";
import { getImageName } from "../util/StringUtils";
import { v4 as uuidv4 } from 'uuid';

export type ServiceResponse = {
    message: string,
    isSuccess: boolean 
}

export default function postUserEvent(status: string, imageUrl: string) {
    return axios.post('http://localhost:8080/status', {
                id: uuidv4(),
                eventType: status,
                imageName: getImageName(imageUrl),
                timestamp: new Date().toISOString()
            })
            .then((response: AxiosResponse<ServiceResponse>) => {
                console.log("User Event Status Http Success. Msg: " + response.data.message);
                // return response.data
            })
            .catch((e: any) => {
                console.log("User Event Status Http Failure. Error: " + e.message || "Unknown");
            });
};