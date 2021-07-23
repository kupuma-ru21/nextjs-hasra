import { initTestHelpers, getPage } from 'next-page-tester';
import { setupServer } from 'msw/node';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { handlers } from '../mock/handlers';

initTestHelpers();

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => {
  server.close();
});

describe('Hasura Fetch Test Cases', () => {
  it('Should render the list of users by useQuery', async () => {
    const { page } = await getPage({ route: '/hasura-main' });
    const { findByText } = render(page);
    await findByText('Hasura main page');
    await findByText('user1');
    await findByText('user2');
    await findByText('user3');
    await findByText('user4');
  });
});
