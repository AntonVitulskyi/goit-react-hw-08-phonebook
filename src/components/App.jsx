import { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Loader from './Loader/Loader';
import Layout from './Layout/Layout';
import LoginPage from 'Pages/LoginPage/LoginPage';
import ContactsPage from 'Pages/ContactsPage/ContactsPage';
import RegisterPage from 'Pages/RegisterPage/RegisterPage';
import { useDispatch } from 'react-redux';
import { authUserRequest } from 'Redux/register/userSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) return;

    dispatch(authUserRequest());
  }, [dispatch]);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="contacts" element={<ContactsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export { App };
