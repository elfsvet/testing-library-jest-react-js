import { Container } from 'react-bootstrap';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';
import { useState } from 'react';

function App() {
  // orderPhase needs to be 'inProgress', 'review' or 'completed'
  const [orderPhase, setOrderPhase] = useState('inProgress');

  let Component = OrderEntry; // default to order page
  switch (orderPhase) {
    case 'inProgress':
      Component = OrderEntry;
      break;
    case 'review':
      Component = OrderSummary;
      break;
    case 'completed':
      Component = OrderConfirmation;
      break;
    default:
  }

  return (
    <OrderDetailsProvider>
      <Container>{<Component setOrderPhase={setOrderPhase} />}</Container>
    </OrderDetailsProvider>
  );

  return (
    <OrderDetailsProvider>
      <Container>
        {/* Summary page and entry page need provider */}
        <OrderEntry />

        {/* confirmation page does not need provider */}
      </Container>
    </OrderDetailsProvider>
  );
}

export default App;
