import Form from 'react-bootstrap/Form';
import './SearchBar.css'

export default function SearchBar(props) {
  return (
    <Form>
      <Form.Control type="text" placeholder={props.placeholder} className="searchbar--bar mx-auto">
      </Form.Control>
    </Form>
  );
}