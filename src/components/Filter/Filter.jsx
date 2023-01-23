import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from 'Redux/filterSlice';

import styles from '../Filter/Filter.module.css';

export default function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);

  const onFilterChange = event => {
    dispatch(changeFilter(event.target.value));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Find contacts by name</h2>
      <input
        type="text"
        onChange={onFilterChange}
        value={filter}
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      />
    </div>
  );
}
