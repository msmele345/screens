import { ChangeEvent, useState } from "react";
import '../scss/feedbackForm.css';
import postFeedback from "../api/FeedbackApi";


export interface FeedbackRequest {
    email?: string;
    content: string;
    timestamp: string;
}

export type FormValues = {
    email: string,
    content: string
} //form combined state obj

const defaultFormState = { email: '', content: '' };

const FeedbackContainer = () => {

    const [formValues, setFormValues] = useState<FormValues>(defaultFormState);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChange = (id: string, e: ChangeEvent<HTMLInputElement>) => {
        console.log("Input Changed: " + e.target.value);
        setFormValues(prevValues => ({
            ...prevValues,
            [id]: e.target.value

        }));
    };

    //TODO
    //add test
    //validate call to back end works
    //deploy to azure
    //add sas to env variables/key vault

    const onSubmitHandler = async (e: any) => {
        e.preventDefault();

        console.log("Email on Submit: ", formValues.email);
        console.log("Content on Submit: ", formValues.content);

        const emailIsValid = formValues.email && formValues.email.includes('@');

        if (!emailIsValid) {
            setErrorMessage("Please Enter a Valid Email Address");
            return;
        }
        //validate form data first - WIP
        console.log("HERE submitHandler() start - AXIOS");
        try {
            const serverResponse = postFeedback(formValues.email, formValues.content)
            console.log("Post Response: ", serverResponse);
        } catch (e: any) {
            console.log("HERE IN AXIOS ERROR")
            setErrorMessage(e.message || 'server error');
        }
        setFormValues(defaultFormState);
    };
    //onSubmit function in form to validate value and fire api vall to new backend that connects blob storage or db directly

    return (
        <div className="feedback-form-container">
            <h3 className="feedback-form-error">{errorMessage && `Error - ${errorMessage} `}</h3>
            <form action="" onSubmit={onSubmitHandler}>
                <h2>Got Feedback?</h2>
                <div className="control-row">
                    <div className="control no-margin">
                        <label htmlFor="content">Drop Suggestions Here!</label>
                        <input
                            value={formValues.content}
                            id="content"
                            name="content"
                            type='text'
                            onChange={(e) => handleChange('content', e)} />
                    </div>
                    <div className="control no-margin">
                        <label htmlFor="email">{"Email"}</label>
                        <input
                            value={formValues.email}
                            id="email"
                            name="email"
                            type='email'
                            onChange={(e) => handleChange('email', e)} />
                    </div >
                </div>
                <p className="form-actions">
                    <button className="button button-flat">Reset</button>
                    <button className="button">Submit Feedback</button>
                </p>
            </form>
        </div>
    )
};

export default FeedbackContainer;