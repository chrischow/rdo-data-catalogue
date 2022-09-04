import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { BiHash } from 'react-icons/bi';
import { getListItems } from "../../utils/queryData";
import { filterTerms } from "../../utils/processData";
import SearchBar from "../SearchBar/SearchBar";
import { config } from '../../config';

export default function BusinessGlossaryView(props) {
  // Set state
  const [terms, setTerms] = useState([]);
  const [keywords, setKeywords] = useState('');

  // Function to sort and set terms
  const setSortTerms = (arr) => {
    const sortedArr = arr.sort((a, b) => a.Title > b.Title ? 1 : -1);
    setTerms(sortedArr);
  };

  // Initial load of data
  useEffect(() => {
    getListItems(
      config.businessTermListId,
      'Id,Title,definition,businessRules,Source',
      '',
      '',
      setSortTerms
    );
  }, []);

  return (
    <div>
      <h1 className="home--title text-center">Business Glossary</h1>

      <div className="mt-5">
        <SearchBar placeholder="Search for terms..." updateSearch={setKeywords} />
      </div>

      <div className="mt-5">
        {terms && filterTerms(terms, keywords).length > 0 &&
          <Table striped responsive bordered className="table column-table">
            <thead className="table-dark">
              <tr>
                <th>Term</th>
                <th>Definition</th>
                <th>Business Rules</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {filterTerms(terms, keywords).map(term => {
                return (
                  <tr key={term.Id}>
                    <td>
                      <Link className="term-link" to={`/term/${term.Id}`}>
                        <BiHash style={{ marginRight: '1px' }} />
                        {term.Title}
                      </Link>
                    </td>
                    <td>{term.definition}</td>
                    <td>{term.businessRules}</td>
                    <td>{term.Source}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>}
        {terms && terms.length > 0 && filterTerms(terms, keywords).length === 0 && keywords != '' &&
        <div className="mt-3 text-center">
          <h4 style={{ fontWeight: 'normal' }}>No results match your search criteria "<em>{keywords}</em>".</h4>
        </div>
        }
        {terms.length === 0 &&
        <div className="text-center">
          <h3>No terms available.</h3>
        </div>
        }
      </div>
    </div>
  );
}