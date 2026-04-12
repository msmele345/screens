import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import AuthenticationPage from '../components/Auth/AuthenticationPage';
import userEvent from '@testing-library/user-event';


describe('Auth Page Test', () => {

    it('should render the auth form with login header', () => {
        render(<AuthenticationPage />);

        const emailLabel = screen.getByLabelText('Email');
        const passwordLabel = screen.getByLabelText('Password');
        const header = screen.getAllByRole('heading');

        expect(emailLabel).toBeVisible();
        expect(passwordLabel).toBeVisible();

        expect(header[0]).toBeVisible();
        expect(header[0]).toHaveTextContent('Lights And Music');
        expect(header[1]).toBeVisible();
        expect(header[1]).toHaveTextContent('Login');
    });

    //todo form actions with user event 

    it('should submit form on click after valid values are entered', () => {
        render(<AuthenticationPage />)

        const emailInput = screen.getByLabelText('Email');
        const pwdlInput = screen.getByLabelText('Password');
        const header = screen.getAllByRole('heading');
        const submitButton = screen.getByRole('button');

        userEvent.type(emailInput, 'someemail@gmail.com')
        userEvent.type(pwdlInput, 'pass')

        userEvent.click(header[0]);

        userEvent.click(submitButton);

        waitFor(() => {
            expect(screen.getByText('Upload')).toBeInTheDocument();
        })

    })

});