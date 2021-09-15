import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from './components/Container';
import PhonebookForm from './components/PhonebookForm';
import PhonebookList from './components/ContactList';
import Filter from './components/Filter';

export default function App() {
  return (
    <Container>
      <h1>Phonebook</h1>
      <PhonebookForm />

      <h2>Contacts</h2>
      <Filter />

      <PhonebookList />

      <ToastContainer
        autoClose={3000}
        theme="colored"
        toastStyle={{ backgroundColor: 'red' }}
      />
    </Container>
  );
}
