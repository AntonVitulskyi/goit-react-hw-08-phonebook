import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Loader from 'components/Loader/Loader';

import ErrorIndicator from 'components/Error/Error';
import Container from 'components/Container/Container';

import styles from './LoginPage.module.css';
import { loginUserRequest } from 'Redux/register/operations';
function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(state => state.auth.isLoading);
  const userData = useSelector(state => state.auth.userData);
  const error = useSelector(state => state.auth.error);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (userData !== null) navigate('/contacts');
  }, [userData, navigate]);

  const handleSubmit = event => {
    event.preventDefault();

    const formData = {
      email,
      password,
    };

    dispatch(loginUserRequest(formData));
  };

  return (
    <Container>
      <h1 className={styles.title}>Login</h1>
      {isLoading && <Loader />}
      {error && <ErrorIndicator error={error} />}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          value={email}
          type="email"
          required
        />
        <input
          className={styles.input}
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          value={password}
          type="password"
          required
        />
        <button className={styles.btnSubmit} disabled={isLoading} type="submit">
          LOGIN
        </button>
      </form>
    </Container>
  );
}

export default LoginPage;
