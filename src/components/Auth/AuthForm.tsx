import { useState } from "react";
import { Form } from "react-router"
import classes from './AuthForm.module.css';
import useAuth from "../../hooks/useAuth";

const AuthForm = () => {
    const { isLoggedIn, onLogin } = useAuth();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        //make api call TODO
        //collect username and pwd from form, validate if needed. Pass to onLogin function
        onLogin("username", "password");
        //
    }
    
    return (
        <form className="form" onSubmit={handleSubmit}>
            <h1>{isLoggedIn ? 'Log in' : 'Create a new user'}</h1>
            <p>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" required />
            </p>
            <p>
                <label htmlFor="image">Password</label>
                <input id="password" type="password" name="password" required />
            </p>
            <div className={classes.actions}>
                <button type="button">
                    {isLoggedIn ? 'Create new user' : 'Login'}
                </button>
                <button>Submit</button>
            </div>
        </form>
    )
};

export default AuthForm;