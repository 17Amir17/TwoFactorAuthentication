import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../Context/UserContext';

export default function Homepage() {
  const Context = useContext(UserContext);
  const navigate = useNavigate();

  if (!Context?.user) {
    navigate('/');
  }

  return (
    <div className={'homepage'}>
      <h1> Welcome {Context?.user ? Context.user.username : ''}! </h1>
    </div>
  );
}
