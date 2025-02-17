import { ChangeEvent, FormEvent, useState } from "react";
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
    const [formError, setFormError] = useState<string | null>(null);

    const handleChange = (id: string, e: ChangeEvent<HTMLInputElement>) => {
        setFormValues(prevValues => ({
            ...prevValues,
            [id]: e.target.value

        }));
    };

    const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Email on Submit: ", formValues.email);
        console.log("Content on Submit: ", formValues.content);

        const emailIsValid = formValues.email && formValues.email.includes('@');

        if (!emailIsValid) {
            setFormError("Please Enter a Valid Email Address");
            return;
        }
        
        if(!formValues.content) {
            setFormError('Please enter a value');
            return;
        }
        
        try {
            const serverResponse = await postFeedback(formValues.email, formValues.content)
            console.log("Post Response: ", serverResponse);
        } catch (e: any) {
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
                            required={true}
                            type='text'
                            onChange={(e) => handleChange('content', e)}/>
                        <div className="control-error">
                            {formError && <p>{formError}</p>}
                        </div>
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
                    <button className="button">Submit Feedback</button>
                </p>
            </form>
        </div>
    )
};

export default FeedbackContainer;