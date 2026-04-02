import { render } from '@testing-library/react';
import BackgroundReveal from './BackgroundReveal';

test('BackgroundReveal renders canvas element', () => {
  const { container } = render(<BackgroundReveal />);
  expect(container.querySelector('canvas')).toBeInTheDocument();
});
