import React, { useState } from 'react';

import styles from '../ContactForm/ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContactOperation } from 'Redux/operations';
import { getContactsItems } from 'Redux/selectors';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(getContactsItems);

  const dispatch = useDispatch();

  const handleChange = e => {
    if (e.target.name === 'name') {
      setName(e.target.value);
    }
    if (e.target.name === 'number') {
      setNumber(e.target.value);
    }
  };
 
  const handleAddContact = e => {
    e.preventDefault();
    const newContact = {
      name: name,
      number: number
    };
    if (
      contacts.some(contact => {
        return contact.name === newContact.name;
      })
    ) {
      return alert(`${newContact.name} is already in contacts!`);
    }
    dispatch(addContactOperation(newContact));
    setName('');
    setNumber('');
  };
  
  return (
    <>
      <h2 className={styles.title}>Phonebook</h2>
      <form className={styles.form} onSubmit={handleAddContact}>
        <label className={styles.label} htmlFor="">
          <span>Name</span>
          <input
            value={name}
            onChange={handleChange}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={styles.label} htmlFor="">
          <span>Number</span>
          <input
            value={number}
            onChange={handleChange}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    </>
  );
}

