import Form from 'react-bootstrap/Form';
import './SearchBar.css'

export default function SearchBar(props) {
  return (
    <Form>
      <Form.Control type="text" placeholder="Search for data resources..." className="searchbar--bar mx-auto">
      </Form.Control>
    </Form>
  );
}