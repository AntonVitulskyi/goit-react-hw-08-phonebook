import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import styles from './Layout.module.css';
import { logOutRequest } from 'Redux/register/userSlice';
import Container from 'components/Container/Container';

function Layout() {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);
  const userName = useSelector(state => state.auth.userData?.name);

  const handleLogOut = () => {
    dispatch(logOutRequest());
  };

  return (
    <>
      <header className={styles.header}>
        <nav>
          {userData === null ? null : (
            <NavLink
              className={({ isActive }) =>
                cn(styles.NavLink, { [styles.active]: isActive })
              }
              to="/contacts"
            >
              Contacts
            </NavLink>
          )}

          {userData !== null ? null : (
            <>
              <NavLink
                className={({ isActive }) =>
                  cn(styles.NavLink, { [styles.active]: isActive })
                }
                to="/register"
              >
                Register
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  cn(styles.NavLink, { [styles.active]: isActive })
                }
                to="/login"
              >
                Login
              </NavLink>
            </>
          )}
          {userData === null ? null : (
            <button
              className={styles.logOutBtn}
              onClick={handleLogOut}
              type="button"
            >
              Log Out
            </button>
          )}
        </nav>
        {userData === null ? null : (
          <h2 className={styles.welcomeText}>{`Welcome, ${userName}`}</h2>
        )}
      </header>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default Layout;
