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
        <form className="form" onSubmit={handleSubmit}>
            <h1>{ 'Log in' }</h1>
            <p>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" required />
            </p>
            <p>
                <label htmlFor="image">Password</label>
                <input id="password" type="password" name="password" required />
            </p>
            <div className={classes.actions}>
                <button>Login</button>
            </div>
        </form>
    )
};

export default AuthForm;