import { FormEvent } from "react";
import { Form } from "react-router"
import classes from './AuthForm.module.css';
import useAuth from "../../hooks/useAuth";

const AuthForm = () => {
    const { isLoggedIn, onLogin } = useAuth();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //collect username and pwd from form, 
        //validate
        //Pass to onLogin function
        onLogin("username", "password");
    }

    return (
        <>
            <div>
                <h1>Lights And Music</h1>
            </div>
            <div className={classes['auth-form']}>
                <form onSubmit={handleSubmit}>
                    <h2>{'Login'}</h2>
                    <div className={classes.actions}>
                        <p>
                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" name="email" required />
                        </p>
                        <p>
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" name="password" required />
                        </p>
                    </div>
                    <div className={classes.actions}>
                        <button>Login</button>
                    </div>
                </form>
            </div>
        </>
    )
};

export default AuthForm;