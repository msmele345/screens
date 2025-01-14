import { ChangeEvent, FormEvent, ReactElement, useState } from "react";

export type FormValues = {
    email: string,
    password: string
} //form combined state obj

const defaultFormState = { email: '', password: '' };

const FeedbackContainer = (): ReactElement => {
    const [formValues, setFormValues] = useState<FormValues>(defaultFormState);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Email on Submit: ", formValues.email)
        console.log("Password on Submit: ", formValues.password)
        //validation

        setFormValues(defaultFormState);
    };

    const handleChange = (id: string, e: ChangeEvent<HTMLInputElement>) => {
        console.log("Input Changed: " + e.target.value);
        setFormValues(prevValues => ({
            ...prevValues,
            [id]: e.target.value

        }));
    };

    return (
        <div className="feedback-form-container">
            <form action="" onSubmit={handleSubmit}>
                <h2>Login</h2>

                <div className="control-row">
                    <div className="control no-margin">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formValues.email}
                            onChange={(e) => handleChange('email', e)}
                        />
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
export default FeedbackContainer;