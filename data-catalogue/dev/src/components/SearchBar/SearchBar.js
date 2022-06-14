import Form from 'react-bootstrap/Form';
import './SearchBar.css'

export default function SearchBar(props) {
  // Function to handle change in keywords
  const handleChange = (event) => {
    props.updateSearch(event.target.value);
  }

  return (
    <Form>
      <Form.Control type="text" placeholder={props.placeholder} className="searchbar--bar mx-auto" onChange={handleChange}>
      </Form.Control>
    </Form>
  );
}