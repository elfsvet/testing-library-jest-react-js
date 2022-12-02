import { render, screen, waitFor } from '@testing-library/react';

import OrderEntry from '../OrderEntry';

import { rest } from 'msw';
import { server } from '../../../mocks/server';

test('Handles error for scoops and toppings routes', async () => {
  // reset our handlers
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
      return res(ctx.status(500));
    }),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);
//    if we have more then one element return from server call in the RaceCondition we want to make sure we returned all of them before running tests. use waitFor with await and async function inside.
  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');

    expect(alerts).toHaveLength(2);
  });
});
