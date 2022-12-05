import { logRoles, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

test('order phases for happy path', async () => {
  const user = userEvent.setup();
  //render app
  render(<App />);

  //add ice cream scoops and toppings
  const vanillaScoop = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  await user.clear(vanillaScoop);
  await user.type(vanillaScoop, '2');

  const cherriesTopping = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });
  await user.click(cherriesTopping);

  // find and click order button
  const orderSummaryButton = screen.getByRole('button', {
    name: /order sundae/i,
  });
  await user.click(orderSummaryButton);

  //check summary information based on order
  const summary = screen.getByRole('heading', { name: /order summary/i });
  expect(summary).toBeInTheDocument();

  const scoopsHeading =  screen.getByRole('heading', { name: 'Scoops: $4.00' });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole('heading', {
    name: 'Toppings: $1.50',
  });
  expect(toppingsHeading).toBeInTheDocument();

  // check summary option items
  expect(screen.getByText('2 Vanilla')).toBeInTheDocument();
  expect(screen.getByText('Cherries')).toBeInTheDocument();

  // //! alternatively...
//   const optionItems = screen.getAllByRole('listitem');
//   const optionItemsText = optionItems.map(item => item.textContent)
//   expect(optionItemsText).toEqual(['2 Vanilla', 'Cherries'])

  //accept terms and conditions and click button to confirm order
  const termsAndConditionCheckbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });

  await user.click(termsAndConditionCheckbox);

  const confirmOrderButton = screen.getByRole('button', {
    name: /confirm order/i,
  });
  await user.click(confirmOrderButton);

  // confirm order number on confirmation page
  const thankYouHeader = await screen.findByRole('heading', {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();
  expect(orderNumber).toHaveTextContent('123456');

  // click new order button on confirmation page
  const newOrderButton = screen.getByRole('button', { name: /new order/i });
  await user.click(newOrderButton);

  // check that scoops and toppings subtotals have been reset
  const scoopsTotal = await screen.findByText('Scoops total: $0.00');
  expect(scoopsTotal).toBeInTheDocument();

  const toppingsTotal = await screen.findByText('Toppings total: $0.00');
  expect(toppingsTotal).toBeInTheDocument();
  // do we need to await anything to avoid test errors?

  // wait for items to appear so that testing library doesn't get angry about stuff happening after test is over
  await screen.findByRole('spinbutton', { name: 'Vanilla' });
  await screen.findByRole('checkbox', { name: 'Cherries' });
});
