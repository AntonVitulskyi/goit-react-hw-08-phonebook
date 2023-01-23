import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from '../ContactItem/ContactItem.module.css';
import { useDispatch } from 'react-redux';
import { deleteContactOperation } from 'Redux/operations';

export default function ContactItem({
  name,
  number,
  id
}) {

const [isDeleting, setIsDeleting] = useState(false)

  const dispatch = useDispatch();

  const onClickDeleteContact = event => {
    setIsDeleting(true)
    dispatch(deleteContactOperation(event.target.id));
  };

  return (
    <li className={styles.item}>
      <p className={styles.name}>{name}:</p>
      <p className={styles.number}>{number}</p>
      <button disabled={isDeleting} className={styles.button} id={id} onClick={onClickDeleteContact}>
        Delete
      </button>
    </li>
  );
}

ContactItem.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  id: PropTypes.string
};
