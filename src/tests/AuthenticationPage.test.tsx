import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import AuthenticationPage from '../components/Auth/AuthenticationPage';


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

});