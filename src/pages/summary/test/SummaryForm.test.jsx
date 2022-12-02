import SummaryForm from '../SummaryForm';
import { fireEvent, render, screen } from '@testing-library/react';

test('checkbox unchecked by default', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
  expect(checkbox).not.toBeChecked();
});

test('checkbox enables button', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox',  { name: /terms and conditions/i });
  const orderButton = screen.getByRole('button', { name: /confirm order/i });
  expect(orderButton).toBeDisabled();
  fireEvent.click(checkbox);
  expect(orderButton).toBeEnabled();
  fireEvent.click(checkbox);
  expect(orderButton).toBeDisabled();
});
