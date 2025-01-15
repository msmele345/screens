import axios from "axios";
import { useState } from "react";


export interface FeedbackRequest {
    email?: string;
    content: string;
    timestamp: string;
}

const FeedbackContainer = () => {

    const [currentContentValue, setCurrentContentValue] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [currentEmail, setCurrentEmail] = useState('');

    const onInputChange = (e: any, id: string) => {
        if (id == 'feedback-content') {
            setCurrentContentValue(e.target.value)
        }

        if (id == 'feedback-email') {
            setCurrentEmail(e.target.value);
        }
        //validate form input and set current value
        //use ref if needed 
    }

    const buildFeedbackRequest = () => ({
        email: currentEmail ?? '',
        content: currentContentValue ?? '',
        submissionTime: new Date().toISOString()
    })

    const onSubmitHandler = async (e: any) => {
        e.preventDefault();
        //validate form data
        console.log("HERE submitHandler() start - AXIOS")
        let response;
        try {
            response = await axios.post("http://localhost:8080/api/v2/feedback", {
                email: currentEmail ?? '',
                content: currentContentValue ?? '',
                submissionTime: new Date().toISOString()
            })
            console.log("Post Response: ", response.data, response.statusText);
        } catch (e: any) {
            console.log("HERE IN AXIOS ERROR")
            response = { error: e.message || 'server error' }
            setErrorMessage(response.error);
        }
        setCurrentContentValue('');
        setCurrentEmail('');
    };
    //onSubmit function in form to validate value and fire api vall to new backend that connects blob storage or db directly

    return (
        <div className="feedback-form-container">
            <h3 className="feedback-form-error">{errorMessage && `Error - ${errorMessage} `}</h3>
            <h2>Got Feedback?</h2>
            <form action="submit" onSubmit={onSubmitHandler}>
                <div className="">
                    <label htmlFor={"feedback-content"}>Drop Suggestions Here!</label>
                    <input value={currentContentValue}
                        id={"feedback-content"}
                        onChange={(e) => setCurrentContentValue(e.target.value)} />
                </div >
                <div className="">
                    <label htmlFor={"feedback-email"}>{"Email"}</label>
                    <input
                        value={currentEmail}
                        id={"feedback-email"}
                        onChange={(e) => setCurrentEmail(e.target.value)} />
                </div >
                {/* <Input
                    labelText="What do you want to see better?"
                    onChangeHandler={(e) => setCurrentContentValue(e.target.value)}
                    id="feedback-content"
                    value={currentContentValue}
                />
                <Input
                    labelText="Email"
                    id="feedback-email"
                    value={currentEmail}
                    onChangeHandler={(e) => setCurrentEmail(e.target.value)}
                /> */}
                <button type="submit">Submit Feedback</button>
            </form>
        </div>
    )
};

export default FeedbackContainer;