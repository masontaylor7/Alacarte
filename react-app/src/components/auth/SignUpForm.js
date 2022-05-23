import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { login, signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false)
  const [validationErrors, setValidationErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()

  const onSignUp = async (e) => {
    e.preventDefault();
    if (validationErrors.length === 0) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        console.log(data)
        setValidationErrors(data)
        return
      } else {
        setShowErrors(false)
        history.push('/home')
      }
    } else {
      setShowErrors(true)
    }
  };

  useEffect(() => {
    const errs = []
    if (username.length === 0) errs.push("Please provide a username.")
    if (email.length === 0) errs.push("Please provide an email address.")
    if (!email.includes('@')) errs.push("Please provide a valid email.")
    if (password.length === 0) errs.push("Please provide a password.")
    if (password !== repeatPassword) errs.push("Passwords do not match.")
    setValidationErrors(errs)
  }, [username, email, password, repeatPassword])

  const handleDemo = async (e) => {
    e.preventDefault()

    const demo = {
      email: 'demo@aa.io',
      password: 'password'
    }
    await dispatch(login(demo.email, demo.password))
    history.push('/home')
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        {showErrors && <div>
          {validationErrors.map((error, ind) => (
            <div key={ind}>- {error}</div>
          ))}
        </div>}
      </div>
      <div>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
      <button className='demo-button' type='button' onClick={handleDemo}>Demo</button>
    </form>
  );
};

export default SignUpForm;
