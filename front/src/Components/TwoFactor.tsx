import React, { useContext, useEffect, useRef } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { UserContext } from '../Context/UserContext';
import { sendQRAnswer } from '../Networking/api';

export function TwoFactor() {
  const codeRef = useRef<HTMLInputElement>(null);
  const Context = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (Context) {
      if (!Context.online) {
        navigate('/');
      }
    }
  }, [Context]);

  const onSendCode = async () => {
    if (codeRef.current && Context && Context.username) {
      const code = codeRef.current?.value;
      const user = await sendQRAnswer(code, Context.username);
      if (user) {
        if (Context) {
          Context.setUser(user);
          if (user.qr) {
            Context.setImage(user.qr);
          }
          navigate('/homepage');
        }
      }
    }
  };

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Two Factor Auth</Card.Title>
          <Card.Text>Enter code from mobile authenticator app</Card.Text>
          <input type="text" placeholder={'code'} ref={codeRef}></input>
          <Button variant="primary" onClick={onSendCode}>
            Send Code
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
