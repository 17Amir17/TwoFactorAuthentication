import { useContext, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { UserContext } from '../Context/UserContext';
import { register, login } from '../Networking/api';
import { isObject } from '../Services/utils';

export default function Login() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const Context = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const registerClick = () => {
    if (usernameRef.current && passwordRef.current)
      register(usernameRef.current.value, passwordRef.current.value);
  };

  const loginClick = async () => {
    if (usernameRef.current && passwordRef.current) {
      const user = await login(
        usernameRef.current.value,
        passwordRef.current.value
      );
      if (isObject(user) && 'twoFactor' in user) {
        if (Context) {
          Context.setImage(user.qr);
          Context.setUsername(user.username);
          Context.setOnline(true);
          navigate('twofactor');
        }
      } else if (user) {
        if (Context) {
          Context.setUser(user);
          Context.setOnline(true);
          navigate('homepage');
        }
      }
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      if (Context) Context.setOnline(false);
    }
  }, [location]);

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
