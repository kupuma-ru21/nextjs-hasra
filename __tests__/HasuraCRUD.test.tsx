import { initTestHelpers, getPage } from 'next-page-tester';
import { setupServer } from 'msw/node';
import { cleanup, render } from '@testing-library/react';
import { handlers, users } from '../mock/handlers';

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

describe('Hasura CRUD Test Cases', () => {
  it('Should render the list of users by useQuery', async () => {
    const { page } = await getPage({ route: '/hasura-crud' });
    const { findByText, getByTestId } = render(page);
    await findByText('Hasura CRUD');
    users.forEach(async (user) => {
      await findByText(user.name);
      await findByText(user.created_at);
      getByTestId(`edit-${user.id}`);
      getByTestId(`delete-${user.id}`);
    });
  });
});
