import React, { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
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

  const onClick = () => {
    if (Context && Context.user) {
      requestTwoFactor(Context.user);
    }
  };

  return (
    <div className={'homepage'}>
      <h1> Welcome {Context?.user ? Context.user.username : ''}! </h1>
      <Button variant="primary" onClick={onClick}>
        Use Two Factor!
      </Button>
    </div>
  );
}
