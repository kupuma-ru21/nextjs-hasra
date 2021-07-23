import { initTestHelpers, getPage } from 'next-page-tester';
import { setupServer } from 'msw/node';
import { cleanup, render } from '@testing-library/react';
import { handlers } from '../mock/handlers';

process.env.NEXT_PUBLIC_HASURA_URL =
  'https://hasura-apollo.hasura.app/v1/graphql';

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

describe('SSG Test Cases', () => {
  it('Should rendered the list of users pre-fetched by getStaticProps', async () => {
    const { page } = await getPage({ route: '/hasura-ssg' });
    const { findByText } = render(page);
    await findByText('SSG+ISR');
    await findByText('user1');
    await findByText('user2');
    await findByText('user3');
  });
});
