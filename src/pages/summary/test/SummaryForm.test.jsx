import SummaryForm from '../SummaryForm';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('checkbox unchecked by default', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();
});

test('checkbox enables button', async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const orderButton = screen.getByRole('button', { name: /confirm order/i });
  expect(orderButton).toBeDisabled();
  await user.click(checkbox);
  expect(orderButton).toBeEnabled();
  await user.click(checkbox);
  expect(orderButton).toBeDisabled();
});

test('popover responds to hover', async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  // popover starts hidden
  // query element not in the dom
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();
  // popover appears on mouseover of checkbox label
  // get element in the dom
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappear when we mouse out
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
