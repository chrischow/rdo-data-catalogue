import React from 'react';
import Form from 'react-bootstrap/Form';
import './styles.css'

interface SearchBarProps {
  placeholder: string;
  updateSearch: (keywords: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = (props) => {
  // Function to handle change in keywords
  const handleChange = (event: any) => {
    props.updateSearch(event.target.value.toLowerCase());
  }

  return (
    <Form>
      <Form.Control type="text" placeholder={props.placeholder} className="searchbar--bar mx-auto" onChange={handleChange}>
      </Form.Control>
    </Form>
  );
}