import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../pages/index';

describe('Should render title text', () => {
  it('Should render title text on Home', () => {
    const { getByText } = render(<Home />);
    expect(getByText('Next.js + GraphQL')).toBeInTheDocument();
  });
});
