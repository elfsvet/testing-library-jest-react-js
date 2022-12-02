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
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

export default function SummaryForm() {

  const [tcChecked, setTcChecked] = useState(false);
  
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        No ice cream will actually be delivered
      </Popover.Body>
    </Popover>
  );
  

  
  
    const checkboxLabel = (
      <span>
        I agree to 
        <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: 'blue' }}> Terms and Conditions</span>
        </OverlayTrigger>
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
