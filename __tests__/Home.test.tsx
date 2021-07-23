import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../pages/index';

process.env.NEXT_PUBLIC_HASURA_URL =
  'https://hasura-apollo.hasura.app/v1/graphql';

describe('Should render title text', () => {
  it('Should render title text on Home', () => {
    const { getByText } = render(<Home />);
    expect(getByText('Next.js + GraphQL')).toBeInTheDocument();
  });
});
