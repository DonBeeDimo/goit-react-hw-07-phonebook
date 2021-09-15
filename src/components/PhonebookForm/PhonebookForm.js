import { useState } from 'react';
import s from './PhonebookForm.module.css';
import Cleave from 'cleave.js/react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { contactsOperations, contactsSelectors } from '../../redux/contacts';
import LoaderComponent from '../LoaderComponent';

export default function PhonebookForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelectors.getContacts);
  const isLoading = useSelector(contactsSelectors.getLoading);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const checkRepeatName = name => {
    return contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );
  };

  const checkRepeatNumber = number => {
    return contacts.find(contact => contact.number === number);
  };

  const checkEmptyQuery = (name, number) => {
    return name.trim() === '' || number.trim() === '';
  };

  const checkValidNumber = number => {
    return !/\d{3}[-]\d{2}[-]\d{2}/g.test(number);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (checkRepeatName(name)) {
      toast(`🤔 ${name} is already in the phonebook.`);
    } else if (checkRepeatNumber(number)) {
      toast(`🤔 ${number} is already in the phonebook.`);
    } else if (checkEmptyQuery(name, number)) {
      toast.info("😱 Enter the contact's name and number phone!");
    } else if (checkValidNumber(number)) {
      toast.error('💩 Enter the correct number phone!');
    } else {
      dispatch(contactsOperations.addContact(name, number));
    }

    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.label}>
        Name
        <input
          className={s.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Ivan Ivanov"
        />
      </label>

      <label className={s.label}>
        Number
        <Cleave
          options={{ delimiter: '-', blocks: [3, 2, 2] }}
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          className={s.input}
          placeholder="111-11-11"
        />
      </label>

      {!isLoading && (
        <button type="submit" className={s.btn}>
          Add contact
        </button>
      )}
      {isLoading && <LoaderComponent />}
    </form>
  );
}
