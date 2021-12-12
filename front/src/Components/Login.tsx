import { useRef } from 'react';
import { register, login } from '../Networking/api';

export default function Login() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const registerClick = () => {
    if (usernameRef.current && passwordRef.current)
      register(usernameRef.current.value, passwordRef.current.value);
  };

  const loginClick = () => {
    if (usernameRef.current && passwordRef.current)
      login(usernameRef.current.value, passwordRef.current.value);
  };

  return (
    <div className="login-wrapper">
      <div className="login">
        <h3>Sign In</h3>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            ref={usernameRef}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            ref={passwordRef}
          />
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="btns">
          <button className="btn btn-primary btn-block" onClick={loginClick}>
            Login
          </button>
          <button className="btn btn-primary btn-block" onClick={registerClick}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
