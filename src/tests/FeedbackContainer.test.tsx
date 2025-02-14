import {vi, it, describe} from 'vitest';
import axios from 'axios';

vi.mock('axios')
describe('FeedackContainer', () => {
    const mockAxios = vi.mocked(axios.post);

    it('Should render the form and header correctly', () => {

    })
})