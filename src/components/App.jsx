import { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Loader from './Loader/Loader';
import Layout from './Layout/Layout';
import LoginPage from 'Pages/LoginPage/LoginPage';
import ContactsPage from 'Pages/ContactsPage/ContactsPage';
import RegisterPage from 'Pages/RegisterPage/RegisterPage';
import { useDispatch, useSelector } from 'react-redux';
import { authUserRequest } from 'Redux/register/operations';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor} from 'Redux/store';

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    if (!token) return;
    
    dispatch(authUserRequest());
  }, [dispatch, token]);

  return (
    <PersistGate loading={null} persistor={persistor}>
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
    </PersistGate>
  );
};

export { App };
