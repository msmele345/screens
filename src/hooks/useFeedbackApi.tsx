import { useEffect, useState } from "react";
import { FormValues } from "../components/FeedbackContainer";
import postFeedback from "../api/FeedbackApi";

const useFeedbackApi = (formValues: FormValues) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [ready, setIsReady] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const submitFeedack = async () => {
            try {
                const serverResponse = await postFeedback(formValues.email, formValues.content)
                console.log("Post Response: ", serverResponse);
                setIsSuccess(serverResponse.isSuccess);
                setMessage(serverResponse.message);
            } catch (e: any) {
                setError(e.message || 'server error');
            }
        }
        submitFeedack();
    }, [])

    return { isSuccess, message, error }
};