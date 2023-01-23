import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import ContactItem from 'components/ContactItem/ContactItem';
import styles from '../ContactList/ContactList.module.css';

export default function ContactList() {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filter);

  const filteredContacts = contacts.filter(contact => {
    return contact.name
      .toLowerCase()
      .trim()
      .includes(filter.toLowerCase().trim());
  });

  return (
    <>
      <h1 className={styles.title}>Contacts</h1>
      <ul className={styles.list}>
        {filteredContacts.map(contact => (
          <ContactItem
            key={contact.id}
            id={contact.id}
            name={contact.name}
            number={contact.number}
          />
        ))}
      </ul>
    </>
  );
}

ContactItem.propTypes = {
  onClickDeleteContact: PropTypes.func,
};
