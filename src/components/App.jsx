import { useDispatch, useSelector } from 'react-redux';

import Container from './Container/Container';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import { fetchContactsOperation } from 'Redux/operations';
import { useEffect } from 'react';

const App = () => {
  const filter = useSelector(state => state.filter);

  const dispatch = useDispatch();

  useEffect(() => {
dispatch(fetchContactsOperation())
  }, [dispatch])

  return (
    <>
      <Container>
        <ContactForm />
        <Filter />
        <ContactList
          filter={filter}
        />
      </Container>
    </>
  );
};

export { App };
