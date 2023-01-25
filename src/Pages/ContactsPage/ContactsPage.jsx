import ErrorIndicator from 'components/Error/Error';
import Loader from 'components/Loader/Loader';
import WithAuthRedirect from 'hoc/WithAuthRedirect';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addContactRequest,
  deleteContactRequest,
  getContactsRequest,
} from 'Redux/contacts/contactSlice';
import {
  selectError,
  selectFilter,
  selectFilteredContacts,
  selectIsLoading,
  selectUserData,
} from 'Redux/contacts/selectors';
import { changeFilter } from 'Redux/filter/filterSlice';
import styles from './ContactsPage.module.css';

function ContactsPage() {
  const dispatch = useDispatch();

  const contacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const userData = useSelector(selectUserData);
  const filter = useSelector(selectFilter);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onFilterChange = event => {
    dispatch(changeFilter(event.target.value));
  };

  useEffect(() => {
    if (userData == null) return;

    dispatch(getContactsRequest());
  }, [userData, dispatch]);

  const handleSubmit = event => {
    event.preventDefault();

    const formData = {
      name,
      number,
    };
    console.log(contacts);
    if (contacts.some(contact => contact.name === formData.name)) {
      return alert(
        `You already have a contact '${formData.name}', type the other one`
      );
    }
    dispatch(addContactRequest(formData));
    setName('');
    setNumber('');
  };
  const handleDeleteContact = contactId => {
    dispatch(deleteContactRequest(contactId));
  };

  const hasError = error?.length > 0;
  return (
    <>
      {hasError && <ErrorIndicator error={error} />}
      {isLoading && <Loader />}
      <h2 className={styles.title}>Add new contact</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          type="text"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        />
        <input
          className={styles.input}
          placeholder="Number"
          value={number}
          onChange={e => setNumber(e.target.value)}
          type="tel"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        />
        <button className={styles.btnSubmit} disabled={isLoading} type="submit">
          Add contact
        </button>
      </form>
      <br />
      <div className={styles.findContact}>
        <input
          className={styles.input}
          placeholder="Find contacts by name"
          type="text"
          onChange={onFilterChange}
          value={filter}
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        />
      </div>
      <h2 className={styles.title}>Your contacts list</h2>
      {Array.isArray(contacts) && contacts.length === 0 && (
        <p>You have no contacts yet, add some!</p>
      )}
      {Array.isArray(contacts) &&
        contacts.map(contact => {
          return (
            <div key={contact.id} className={styles.contactItem}>
              <h3 className={styles.contactName}>{contact.name}</h3>
              <p className={styles.contactNumber}>{contact.number}</p>
              <button
                className={styles.btnDelete}
                disabled={isLoading}
                onClick={() => handleDeleteContact(contact.id)}
              >
                &times;
              </button>
            </div>
          );
        })}
    </>
  );
}

const ProtectedContactsPage = WithAuthRedirect(ContactsPage, '/login');

export default ProtectedContactsPage;
