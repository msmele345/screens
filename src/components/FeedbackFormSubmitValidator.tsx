import { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import '../scss/feedbackform.css';

const defaultFormState = { email: '', password: '' };
const defaultTouchedState = { email: false, password: false };

export type FormValues = {
    email: string,
    password: string
}; //form combined state obj

export type InputStatus = {
    value: string,
    isValid: boolean;
    isTouched: boolean
};

export type FormValues2 = {
    email: InputStatus,
    password: InputStatus
}


const FeedbackFormSubmitValidator = (): ReactElement => {
    const [formValues, setFormValues] = useState<FormValues>(defaultFormState);
    const [inputTouched, setInputTouched] = useState(defaultTouchedState);
    const [emailIsInvalid, setEmailIsInvalid] = useState(false);

    const emailIsValid: boolean = inputTouched.email && formValues.email.trim().includes('@');

    const handleInputBlur = (id: string) => {
        setInputTouched(prevValues => ({
            ...prevValues,
            [id]: true
        }))
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!emailIsValid) {
            setEmailIsInvalid(true);
            return;
        }

        setEmailIsInvalid(false);

        console.log("Email on Submit: ", formValues.email)
        console.log("Password on Submit: ", formValues.password)
        //validation

        setFormValues(defaultFormState);
        setInputTouched(defaultTouchedState);
    };

    const handleChange = (id: string, e: ChangeEvent<HTMLInputElement>) => {
        setFormValues(prevValues => ({
            ...prevValues,
            [id]: e.target.value

        }));
        setInputTouched(prevValues => ({
            ...prevValues,
            [id]: false
        })) //remove the error when the user starts typing again after getting an error message
    };

    return (
        <div className="feedback-form-container">
            <form action="" onSubmit={handleSubmit}>
                <h2>Got Feedback?</h2>

                <div className="control-row">
                    <div className="control no-margin">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            onBlur={() => handleInputBlur('email')}
                            value={formValues.email}
                            onChange={(e) => handleChange('email', e)}
                        />
                        <div className="control-error">
                            {inputTouched.email && !emailIsValid && <p>Please Enter a Valid Email Address</p>}
                        </div>
                    </div>

                    <div className="control no-margin">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={formValues.password}
                            onChange={(e) => handleChange('password', e)}
                        />
                    </div>
                </div>

                <p className="form-actions">
                    <button className="button button-flat">Reset</button>
                    <button className="button">Login</button>
                </p>
            </form>
        </div>
    )
};
//type button prevents submitting by default
export default FeedbackFormSubmitValidator;