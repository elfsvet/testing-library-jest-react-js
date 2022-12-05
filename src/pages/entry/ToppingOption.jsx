import { Col, Form } from 'react-bootstrap';
import { useOrderDetails } from '../../contexts/OrderDetails';

// todo call updateItemCount, with 1 checkbox on or 0 checkbox off
// todo include names and checkboxes
// onChange handler
// use checkbox from ordersummary as a model

export default function ToppingOption({ name, imagePath }) {
  const { updateItemCount } = useOrderDetails();

  const handleChange = (event) =>
    updateItemCount(name, event.target.checked ? 1 : 0, 'toppings');
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        src={`http://localhost:3030/${imagePath}`}
        style={{ width: '75%' }}
        alt={`${name} topping`}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check type='checkbox' onChange={handleChange} label={name} />
      </Form.Group>
    </Col>
  );
}
