// import { useState } from 'react';

// export default function SummaryForm() {

//   const [disable, setDisable] = useState(true);

//   const checkHandler = (e) => {
//     setDisable(!e.target.checked)

//   }
//   return (
//     <div>
//       <button disabled={disable}>Confirm Order</button>
//       <input type='checkbox' id='disable-order-button' onChange={checkHandler} defaultChecked={!disable} />
//       <label htmlFor='disable-order-button'>You need to agree to our Terms and conditions</label>
//     </div>
//   );
// }

import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function SummaryForm() {

  const [tcChecked, setTcChecked] = useState(false);

  const checkboxLabel = (
    <span>
      I agree to <span style={{ color: 'blue' }}>Terms and Conditions</span>
    </span>
  );

  return (
    <Form>
      <Form.Group controlId='terms-and-conditions'>
        <Form.Check
          type='checkbox'
          checked={tcChecked}
          onChange={e => setTcChecked(e.target.checked)}
          label={checkboxLabel}
        ></Form.Check>
      </Form.Group>
      <Button type='submit' variant='primary' disabled={!tcChecked}>Confirm Order</Button>
    </Form>
  );
}
