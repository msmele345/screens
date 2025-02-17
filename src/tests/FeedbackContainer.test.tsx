import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import postFeedback from '../api/FeedbackApi';
import FeedbackContainer from '../components/FeedbackContainer';


vi.mock('../api/FeedbackApi')
describe('FeedackContainer', () => {
    const mockPostFeedack = vi.mocked(postFeedback);

    afterEach(() => {
        vi.clearAllMocks()
    });

    it('Should render the form and header correctly', () => {
        render(<FeedbackContainer />);

        const emailInput = screen.getByLabelText('Email');
        const contentInput = screen.getByLabelText('Drop Suggestions Here!');

        expect(emailInput).toBeVisible();
        expect(contentInput).toBeVisible();
    });

    it('should call feedback api when user clicking submit with valid input.', async () => {
        mockPostFeedack
            .mockResolvedValue({ message: 'Successfully Processed Message', isSuccess: true });

        render(<FeedbackContainer />);

        const emailInput = screen.getByLabelText('Email');
        const contentInput = screen.getByLabelText('Drop Suggestions Here!');
        const submitButton = screen.getAllByRole('button')[0];

        expect(submitButton).toBeVisible();
        expect(submitButton).toHaveTextContent('Submit Feedback');

        await userEvent.click(emailInput);
        await userEvent.type(emailInput, 'bob@test.com');

        await userEvent.click(contentInput);
        await userEvent.type(contentInput, 'Great Site');

        expect(emailInput).toHaveValue('bob@test.com');
        expect(contentInput).toHaveValue('Great Site');

        userEvent.click(document.body)
        // screen.debug()

        userEvent.click(submitButton);
        await waitFor(() => {
            expect(mockPostFeedack).toHaveBeenCalledWith(
                'bob@test.com',
                'Great Site',
            );
        })
    });
})

//const mockSubmissionDate = new Date('2024-03-15T10:00:00.000Z');
// vi.setSystemTime(mockSubmissionDate);