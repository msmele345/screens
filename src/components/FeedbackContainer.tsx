import axios from "axios";
import { ChangeEvent, useState } from "react";
import '../scss/feedbackForm.css';


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

    const onSubmitHandler = async (e: any) => {
        e.preventDefault();

        e.preventDefault();

        console.log("Email on Submit: ", formValues.email)
        console.log("Content on Submit: ", formValues.content)

        //validate form data first - WIP
        ///
        console.log("HERE submitHandler() start - AXIOS");
        // let response;
        // try {
        //     response = await axios.post("http://localhost:8080/api/v2/feedback", {
        //         email: formValues.email,
        //         content: formValues.content,
        //         submissionTime: new Date().toISOString()
        //     })
        //     console.log("Post Response: ", response.data, response.statusText);
        // } catch (e: any) {
        //     console.log("HERE IN AXIOS ERROR")
        //     response = { error: e.message || 'server error' }
        //     setErrorMessage(response.error);
        // }
        setFormValues(defaultFormState);
    };
    //onSubmit function in form to validate value and fire api vall to new backend that connects blob storage or db directly

    return (
        <div className="feedback-form-container">
            {/* <h3 className="feedback-form-error">{errorMessage && `Error - ${errorMessage} `}</h3> */}
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