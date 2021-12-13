import React, { useContext, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import context from 'react-bootstrap/esm/AccordionContext';
import { useNavigate } from 'react-router';
import { UserContext } from '../Context/UserContext';
import { requestTwoFactor } from '../Networking/api';

export default function Homepage() {
  const Context = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (Context) {
      if (!Context.user) {
        navigate('/');
      }
    }
  }, [Context]);

  const onClick = async () => {
    if (Context && Context.user) {
      const qr = await requestTwoFactor(Context.user);
      if (qr) {
        const user = Context.user;
        user.hasTwoFactor = true;
        Context.setUser(user);
        Context.setImage(qr);
      }
    }
  };

  return (
    <div className={'homepage'}>
      <h1> Welcome {Context?.user ? Context.user.username : ''}! </h1>
      {Context?.user?.hasTwoFactor ? (
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={Context.image} alt={'img'} />
          <Card.Body>
            <Card.Title>Your QR Code</Card.Title>
            <Card.Text>Scan the code and save it!</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Button variant="primary" onClick={onClick}>
          Use Two Factor!
        </Button>
      )}
    </div>
  );
}
