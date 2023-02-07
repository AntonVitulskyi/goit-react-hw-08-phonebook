import Container from 'components/Container/Container';
import ErrorIndicator from 'components/Error/Error';
import Loader from 'components/Loader/Loader';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUserRequest } from 'Redux/register/operations';
import styles from './RegisterPage.module.css';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(state => state.auth.isLoading);
  const userData = useSelector(state => state.auth.userData);
  const error = useSelector(state => state.auth.error);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (userData !== null) navigate('/contacts');
  }, [userData, navigate]);

  const handleSubmit = event => {
    event.preventDefault();

    const formData = {
      name,
      email,
      password,
    };

    dispatch(registerUserRequest(formData));
  };

  return (
    <Container>
      <h1 className={styles.title}>Registration</h1>
      {isLoading && <Loader />}
      {error && <ErrorIndicator error={error} />}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          placeholder="Name"
          onChange={e => setName(e.target.value)}
          value={name}
          type="text"
          required
        />
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
        <button className={styles.btnSubmit} type="submit">
          REGISTER
        </button>
      </form>
    </Container>
  );
}

export default RegisterPage;
