import { render, screen } from '../../../test-utils/testing-library-utils';
import Options from '../Options';
import userEvent from '@testing-library/user-event';
import OrderEntry from '../OrderEntry';
// import { OrderDetailsProvider } from '../../../contexts/OrderDetails';

test('update scoop subtotal when scoops change', async () => {
  const user = userEvent.setup();
  render(<Options optionType='scoops' />);

  //   make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');
  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  //update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('update toppings subtotal with toppings selected', async () => {
  const user = userEvent.setup();
  render(<Options optionType='toppings' />);

  // assert on default toppings subtotal
  // make sure total starts out at $0.00
  const toppingsSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  //find and tick one box, assert on updated subtotal
  // see handlers for server response which toppings
  // await and find for checkbox
  // add cherries and check subtotal
  const checkboxCherries = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });
  expect(checkboxCherries).not.toBeChecked();
  await user.click(checkboxCherries);
  expect(checkboxCherries).toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent('1.50');

  // tick another box on assert on subtotal
  //make sure code can handle two simultaneous boxes (raceCondition)
  const checkboxMAndMs = await screen.findByRole('checkbox', { name: 'M&Ms' });
  expect(checkboxMAndMs).not.toBeChecked();
  await user.click(checkboxMAndMs);
  expect(checkboxMAndMs).toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent('3.00');

  // tick one of the boxes off and assert on subtotal
  // make sure code can handle box checked then unchecked
  expect(checkboxCherries).toBeChecked();
  await user.click(checkboxCherries);
  expect(checkboxCherries).not.toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent('1.50');

  // useEvent reminders: setup() and await for promise.
});

describe('grand total', () => {
    
  test('grand total updates properly if scoop is added first', async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const totalSummary = screen.getByRole('heading', {
      name: /Grand total: \$/,
    });
    // test that the total starts out at $0.00
    expect(totalSummary).toHaveTextContent('0.00');
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');
    expect(totalSummary).toHaveTextContent('2.00');

    // add cherries and check grand total
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    expect(cherriesCheckbox).not.toBeChecked();
    await user.click(cherriesCheckbox);
    expect(cherriesCheckbox).toBeChecked();
    expect(totalSummary).toHaveTextContent('3.50');
  });

  test('grand total updates properly if topping is added first', async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const totalSummary = screen.getByRole('heading', {
      name: /Grand total: \$/,
    });
    expect(totalSummary).toHaveTextContent('0.00');

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    await user.click(cherriesCheckbox);

    expect(totalSummary).toHaveTextContent('1.50');
  });

  test('grand total updates properly if item is removed', async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const totalSummary = screen.getByRole('heading', {
      name: /Grand total: \$/,
    });
    // assert
    expect(totalSummary).toHaveTextContent('0.00');

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    await user.click(cherriesCheckbox);
    // assert
    expect(totalSummary).toHaveTextContent('1.50');

    const chocolateScoop = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    });
    await user.clear(chocolateScoop);
    await user.type(chocolateScoop, '2');
    // assert
    expect(totalSummary).toHaveTextContent('5.50');

    await user.clear(chocolateScoop);
    await user.type(chocolateScoop, '1');
    expect(totalSummary).toHaveTextContent('3.50');

    // remove everything from checkout
    await user.clear(chocolateScoop);
    await user.type(chocolateScoop, '0');
    // assert
    expect(totalSummary).toHaveTextContent('1.50');

    await user.click(cherriesCheckbox);
    // assert
    expect(totalSummary).toHaveTextContent('0.00');
  });
});
