import axios, { AxiosResponse } from "axios";
import { ServiceResponse } from "./UserEventApi";

export default async function postFeedback(email: string, content: string) {
    const res: AxiosResponse<ServiceResponse> = await axios
        .post(
            "http://localhost:8092/api/v2/feedback",
            {
                email: email,
                content: content,
                submissionTime: new Date().toISOString()
            });

    return res.data;
}