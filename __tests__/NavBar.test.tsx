import { initTestHelpers, getPage } from 'next-page-tester';
import { setupServer } from 'msw/node';
import { cleanup, fireEvent, render } from '@testing-library/react';
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

describe('Navigation Test Cases', () => {
  it('Should route to selected page in navbar', async () => {
    const { page } = await getPage({ route: '/' });
    const { findByText, getByTestId } = render(page);

    await findByText('Next.js + GraphQL');

    fireEvent.click(getByTestId('makevar-nav'));
    await findByText('makeVar');

    fireEvent.click(getByTestId('fetchpolicy-nav'));
    await findByText('Hasura main page');

    fireEvent.click(getByTestId('crud-nav'));
    await findByText('Hasura CRUD');

    fireEvent.click(getByTestId('ssg-nav'));
    await findByText('SSG+ISR');

    fireEvent.click(getByTestId('memo-nav'));
    await findByText('CustomHook + useCallback + memo');

    fireEvent.click(getByTestId('home-nav'));
    await findByText('Next.js + GraphQL');
  });
});
